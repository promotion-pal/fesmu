import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { ArrowRightCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { CommonStyle } from "../types/style";

interface CommonPreviewCardProps extends CommonStyle {
  img: string;
  link: string;
  title: string;
  action: string;
}
const CommonPreviewCard: FC<CommonPreviewCardProps> = ({
  img,
  link,
  title,
  action,
  styleWrapper,
}) => {
  return (
    <Card
      className={cn(
        "group overflow-hidden py-0 md:w-[300px] pb-4 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
        styleWrapper,
      )}
    >
      <Link href={link} className="block h-full">
        <div className="relative h-[200px] overflow-hidden">
          <Image
            fill
            src={img}
            alt="Запись на дежурство"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 from-black/60 via-transparent to-transparent" />
        </div>

        <CardHeader className="pb-2 mt-3">
          <CardTitle className="text-xl font-semibold text-foreground">
            {title}
          </CardTitle>
        </CardHeader>

        <CardFooter className="pt-0">
          <Button
            variant="ghost"
            className="w-full rounded-full justify-between transition-colors"
            asChild
          >
            <div>
              <span className="font-medium">{action}</span>
              <ArrowRightCircleIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};
export { CommonPreviewCard };
