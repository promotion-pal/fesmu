import { ROUTE } from "@/config/path";
import { CommonPreviewCard } from "@/shared/common/preview";

export const VacationPreview = () => {
  return (
    <CommonPreviewCard
      link={ROUTE.VACATION()}
      title="Зимние каникулы"
      img="/img/vacation.jpg"
    />
  );
};
