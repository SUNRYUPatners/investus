export { default } from "@/app/insight/page";
import { insightMetadataFor } from "@/lib/markets/insightMetadata";

export function generateMetadata() {
  return insightMetadataFor("kr-re");
}
