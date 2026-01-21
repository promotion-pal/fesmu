import { ROUTE } from "@/config/path";
import { CommonPreviewCard } from "@/shared/common/preview";

export const BoardPreview = () => {
  return (
    <CommonPreviewCard
      link={ROUTE.BOARD}
      title="Авито"
      action="Опубликовать"
      img="/img/board.jpg"
    />
  );
};
