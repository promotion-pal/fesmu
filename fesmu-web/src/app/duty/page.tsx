import { ROUTE } from "@/config/path";
import { CommonWrapper } from "@/widgets/common/wrapper";
import { ListFloorsDutyUi } from "@/widgets/duty";
import React from "react";

export default function DutyPage() {
  return (
    <CommonWrapper back={ROUTE.MAIN} styleWrapper="container pb-10">
      <ListFloorsDutyUi />
    </CommonWrapper>
  );
}
