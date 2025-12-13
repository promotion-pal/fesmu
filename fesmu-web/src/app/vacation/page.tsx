import { ROUTE } from "@/config/path";
import { CommonListFloors } from "@/shared/common/floors";
import { CommonWrapper } from "@/shared/common/wrapper";
import React from "react";

export default function VacationPage() {
  return (
    <CommonWrapper back={ROUTE.MAIN} styleWrapper="container pb-10">
      <CommonListFloors floors={[10]} link={(id) => ROUTE.VACATION(id)} />
    </CommonWrapper>
  );
}
