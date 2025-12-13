import { ROUTE } from "@/config/path";
import { CommonPreviewCard } from "@/shared/common/preview";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

const DutyPreview = ({ styleWrapper }: { styleWrapper?: string }) => {
  return (
    <CommonPreviewCard
      img="/img/cook.mov"
      link={ROUTE.DUTY()}
      title="Запись на дежурство"
    />
  );
};

// const ListFloorsDutyUi = ({ styleWrapper }: { styleWrapper?: string }) => {
//   return (
//     <div className={cn("space-y-4", styleWrapper)}>
//       {Array.from({ length: 14 }, (_, i) => {
//         const floor = i + 1;

//         if ([1, 2, 3, 4, 6, 7, 8, 11, 12, 13, 14].includes(floor)) return null;

//         return (
//           <Link
//             key={floor}
//             href={ROUTE.DUTY({ id: floor })}
//             className={cn(
//               "rounded-lg px-2 py-2 flex justify-between items-center bg-zinc-50"
//             )}
//           >
//             <p>{floor} Этаж</p>
//             <ChevronRightIcon />
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

export { DutyPreview };
