import { getFiles } from "@/lib/getFiles";
import Portfolio from "@/app/components/Portfolio";

export default function Page() {
  return <Portfolio files={getFiles()} />;
}
