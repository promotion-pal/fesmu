import React, { FC } from "react";
import { cn } from "../lib/utils";
import { CommonStyle } from "../types/style";
import Link from "next/link";
import { BasePageProps } from "@/config/path";
import { ChevronRightIcon } from "lucide-react";

interface CommonListFloorsProps extends CommonStyle {
  floors?: number[];
  link: (params: BasePageProps) => string;
}

const CommonListFloors: FC<CommonListFloorsProps> = ({
  link,
  floors,
  styleWrapper,
}) => {
  const list = floors || Array.from({ length: 14 }, (_, i) => i + 1);

  const filteredFloors = list.filter((floor) => ![1, 6, 7].includes(floor));

  return (
    <div className={cn("space-y-4", styleWrapper)}>
      {filteredFloors.map((floor) => (
        <Link
          key={floor}
          href={link({ id: floor })}
          className={cn(
            "rounded-lg px-2 py-2 flex justify-between items-center bg-zinc-50 hover:bg-zinc-100 transition-colors"
          )}
        >
          <p className="font-medium">{floor} Этаж</p>
          <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </Link>
      ))}
    </div>
  );
};

export { CommonListFloors };
