import { DutyPreview } from "@/widgets/duty";
import { VacationPreview } from "@/widgets/vacation";

export default function Home() {
  return (
    <div className="container flex gap-4 pb-10 flex-col md:flex-row">
      <DutyPreview />
      <VacationPreview />
    </div>
  );
}
