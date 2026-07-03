import { permanentRedirect } from "next/navigation";

export default function MastersRedirect() {
  permanentRedirect("/insight/basics");
}
