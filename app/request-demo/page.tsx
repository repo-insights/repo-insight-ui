import { InfoPageShell } from "@/modules/marketing/components/info-page-shell";
import { infoPages } from "@/modules/marketing/lib/info-pages";

export default function RequestDemoPage() {
  return <InfoPageShell {...infoPages["request-demo"]} />;
}
