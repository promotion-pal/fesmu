import { ROUTE } from "@/config/path";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { ArrowRightCircleIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const NavigationCardDutyUi = ({ styleWrapper }: { styleWrapper?: string }) => {
  return (
    <Card
      className={cn(
        "group overflow-hidden py-0 pb-4 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
        styleWrapper
      )}
    >
      <Link href={ROUTE.DUTY()} className="block h-full">
        <div className="relative h-[200px] overflow-hidden">
          <Image
            fill
            src="/img/cook.mov"
            alt="Запись на дежурство"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <CardHeader className="pb-2 mt-3">
          <CardTitle className="text-xl font-semibold text-foreground">
            Запись на дежурство
          </CardTitle>
        </CardHeader>

        <CardFooter className="pt-0">
          <Button
            variant="ghost"
            className="w-full rounded-full justify-between transition-colors"
            asChild
          >
            <div>
              <span className="font-medium">Записаться</span>
              <ArrowRightCircleIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </div>
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

const ListFloorsDutyUi = ({ styleWrapper }: { styleWrapper?: string }) => {
  return (
    <div className={cn("space-y-4", styleWrapper)}>
      {Array.from({ length: 14 }, (_, i) => {
        const floor = i + 1;

        if ([1, 7, 8].includes(floor)) return null;

        return (
          <Link
            key={floor}
            href={ROUTE.DUTY({ id: floor })}
            className={cn(
              "rounded-lg px-2 py-2 flex justify-between items-center bg-zinc-50"
            )}
          >
            <p>{floor} Этаж</p>
            <ChevronRightIcon />
          </Link>
        );
      })}
    </div>
  );
};

export { NavigationCardDutyUi, ListFloorsDutyUi };
