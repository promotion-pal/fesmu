"use client";

import { CommonFrom } from "@/features/form";
import { CommonDatePicker, CommonTextField } from "@/features/form/fields";
import { Button } from "@/shared/ui/button";
import { CommonWrapper, CommonWrapperForm } from "@/shared/common/wrapper";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { schemaVacation } from "@/widgets/vacation/schema";
import { ROUTE } from "@/config/path";
import { CommonLoaderForm } from "@/shared/common/loader";
import { vocationService } from "@/features/api/vocation/api";
import { toast } from "sonner";

export default function RecordVocationPage() {
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  return (
    <CommonWrapper back={ROUTE.VACATION()} styleWrapper="container pb-15">
      <CommonFrom
        schema={schemaVacation}
        defaultValues={{
          room: "",
          lastName: "",
          firstName: "",
          patronymic: "",
          arrivalDate: new Date(),
          departureDate: new Date(),
          floorNumber: Number(id),
        }}
        onSubmit={async (data) => {
          // const payload = {
          //   ...data,
          //   arrival_date: data.arrival_date.toISOString(),
          //   departure_date: data.departure_date.toISOString(),
          // };

          try {
            await vocationService.create(data);
            toast.success("Запись сохранена");
            setTimeout(() => {
              router.push(ROUTE.MAIN);
            }, 1500);
          } catch (error) {
            console.log(error);
            toast.success("Не удалось сохранить запись");
          }
        }}
      >
        {(form) => {
          return (
            <CommonWrapperForm title="Дата" styleWrapper="relative">
              <div className="grid md:grid-cols-3 items-center gap-4">
                <CommonTextField
                  label="Фамилия"
                  name="lastName"
                  placeholder="Иванович"
                  form={form}
                  allowedPattern={/^[а-яёА-ЯЁ]*$/}
                />

                <CommonTextField
                  label="Имя"
                  name="firstName"
                  placeholder="Иван"
                  form={form}
                  allowedPattern={/^[а-яёА-ЯЁ]*$/}
                />

                <CommonTextField
                  label="Отчество"
                  name="patronymic"
                  placeholder="Иванов"
                  form={form}
                  allowedPattern={/^[а-яёА-ЯЁ]*$/}
                />

                <CommonTextField
                  label="Номер комнаты"
                  name="room"
                  form={form}
                  placeholder="404"
                  allowedPattern={/^[0-9]{0,4}$/}
                />

                <CommonDatePicker
                  label="Дата отъезда"
                  form={form}
                  name="departureDate"
                />

                <CommonDatePicker
                  label="Дата приезда"
                  form={form}
                  name="arrivalDate"
                />
              </div>

              <Button type="submit" className="mt-10 w-full">
                Сохранить
              </Button>

              <CommonLoaderForm isLoad={loading} />
            </CommonWrapperForm>
          );
        }}
      </CommonFrom>
    </CommonWrapper>
  );
}
