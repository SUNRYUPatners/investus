import { permanentRedirect } from "next/navigation";

export default function PrivacyPolicyRedirect() {
  permanentRedirect("/more/privacy");
}
