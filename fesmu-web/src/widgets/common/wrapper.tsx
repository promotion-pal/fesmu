import { cn } from "@/shared/lib/utils";
import {
  ArrowRightCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface WrapperProps {
  title?: string;
  children: ReactNode;
  styleChildren?: string;
  styleWrapper?: string;
}

interface CommonWrapperProps extends WrapperProps {
  back?: string;
}
const CommonWrapper: FC<CommonWrapperProps> = ({
  back,
  title,
  children,
  styleWrapper,
  styleChildren,
}) => {
  return (
    <div className={cn("space-y-5", styleWrapper)}>
      {back && (
        <Link href={back} className="flex items-center gap-2">
          <ChevronLeftIcon size={20} />
          <p>Назад</p>
        </Link>
      )}
      <p className="">{title}</p>

      <div className={cn(styleChildren)}>{children}</div>
    </div>
  );
};

export { CommonWrapper, type WrapperProps };
