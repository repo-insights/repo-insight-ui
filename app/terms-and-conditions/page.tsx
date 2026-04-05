import { InfoPageShell } from "@/modules/marketing/components/info-page-shell";
import { infoPages } from "@/modules/marketing/lib/info-pages";

export default function TermsAndConditionsPage() {
  return <InfoPageShell {...infoPages["terms-and-conditions"]} />;
}
