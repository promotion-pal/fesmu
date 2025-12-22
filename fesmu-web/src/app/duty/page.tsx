import { ROUTE } from "@/config/path";
import { CommonListFloors } from "@/shared/common/floors";
import { CommonWrapper } from "@/shared/common/wrapper";

export default function DutyPage() {
  return (
    <CommonWrapper back={ROUTE.MAIN} styleWrapper="container pb-10">
      <CommonListFloors floors={[5, 9, 10]} link={(id) => ROUTE.DUTY(id)} />
    </CommonWrapper>
  );
}
