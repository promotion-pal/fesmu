import { ROUTE } from "@/config/path";
import { CommonPreviewCard } from "@/shared/common/preview";

const DutyPreview = ({ styleWrapper }: { styleWrapper?: string }) => {
  return (
    <CommonPreviewCard
      action="Записаться"
      img="/img/cook.mov"
      link={ROUTE.DUTY()}
      title="Запись на дежурство"
    />
  );
};

export { DutyPreview };
