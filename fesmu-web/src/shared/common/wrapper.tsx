import { cn } from "@/shared/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface WrapperProps {
  title?: string;
  children: ReactNode;
  styleWrapper?: string;
  styleChildren?: string;
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

const CommonWrapperForm: FC<WrapperProps> = ({
  title,
  children,
  styleWrapper,
  styleChildren,
}) => (
  <div className={cn("rounded-lg pb-15 shadow-sm px-3 py-3", styleWrapper)}>
    <p className="text-lg mb-5">{title}</p>
    <div className={cn(styleChildren)}>{children}</div>
  </div>
);

export { CommonWrapper, CommonWrapperForm, type WrapperProps };
