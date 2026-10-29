import { redirect } from "next/navigation";

// Payment / e-book purchase flow removed (ads-only monetization).
export default function BuyFailPage() {
  redirect("/more");
}
