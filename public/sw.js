const CACHE = "investus-v1783485676183";

self.addEventListener("install", (e) => {
  // Activate immediately — don't wait for old tabs to close
  e.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── Push 알림 수신 ────────────────────────────────────────────────────────
self.addEventListener("push", (e) => {
  let data = { title: "📋 Investus", message: "새 리포트가 업데이트됐습니다.", url: "/" };
  try { if (e.data) data = { ...data, ...JSON.parse(e.data.text()) }; } catch { /* ignore */ }

  e.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
      icon: "/logo-sunryu.jpeg",
      badge: "/logo-sunryu.jpeg",
      data: { url: data.url },
      tag: "report-update",
      renotify: true,
    })
  );
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = e.notification.data?.url ?? "/";
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((c) => c.url.includes(self.location.origin));
      if (existing) { existing.focus(); existing.navigate(url); }
      else self.clients.openWindow(url);
    })
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  // API routes — never cache, always network
  if (url.pathname.startsWith("/api/")) {
    e.respondWith(fetch(e.request));
    return;
  }

  // /_next/static/ — content-hashed, immutable: cache-first
  // These files never change content for a given hash, so caching is safe
  if (url.pathname.startsWith("/_next/static/")) {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        if (cached) return cached;
        return fetch(e.request).then((res) => {
          if (res.ok && res.status < 400) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  // HTML pages and everything else — network-first with offline fallback
  // Always fetch fresh HTML so asset hashes in <script>/<link> are correct.
  // Fall back to cache only when completely offline.
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        if (res.ok && res.status < 400) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
