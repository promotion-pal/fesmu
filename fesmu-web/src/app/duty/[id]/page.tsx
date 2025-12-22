"use client";

import { ROUTE } from "@/config/path";
import { dutyService } from "@/features/api/duty";
import { Duty } from "@/features/api/duty";
import { CommonFrom } from "@/features/form";
import { CommonSelectFields, CommonTextField } from "@/features/form/fields";
import { CalendarDuty } from "@/shared/calendar-duty";
import { Button } from "@/shared/ui/button";
import { CommonWrapper, CommonWrapperForm } from "@/shared/common/wrapper";
import { schemaTenantDuty } from "@/widgets/duty/schema";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

const getCurrentVladivostokHour = (): string => {
  const now = new Date();
  return now.toLocaleString("ru-RU", {
    timeZone: "Asia/Vladivostok",
    hour: "2-digit",
    hour12: false,
  });
};

export default function RecordDutyPage() {
  const params = useParams();
  const id = params.id as string;

  const [duty, setDuty] = useState<Duty[]>([]);
  const [loading, setLoading] = useState(false);

  const formDataRef = useRef<any>(null);

  const fetchDutyData = async () => {
    try {
      setLoading(true);
      const res = await dutyService.getRecorded(Number(id));
      setDuty(res);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
      toast.error("Не удалось загрузить актуальные данные");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDutyData();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDutyData();
    }, 20000);

    return () => clearInterval(interval);
  }, [id]);

  const router = useRouter();

  return (
    <CommonWrapper back={ROUTE.DUTY()} styleWrapper="container pb-15">
      <CommonFrom
        schema={schemaTenantDuty}
        defaultValues={{
          room: "",
          group: "",
          phone: "+7",
          last_name: "",
          first_name: "",
          patronymic: "",
          date: undefined as any,
          faculty: "pediatric",
          floorNumber: Number(id),
        }}
        onSubmit={async (data) => {
          try {
            const course = parseInt(data.group.charAt(0));
            const currentHour = +getCurrentVladivostokHour();

            const selectedDate = new Date(data.date);
            const dayOfWeek = selectedDate.getDay();

            if (course === 1 && (dayOfWeek === 0 || dayOfWeek === 6)) {
              toast.error("1 курс не может записываться на выходные дни");
              return;
            }

            if (course === 4 || course === 5) {
              if (currentHour < 17 || currentHour >= 19) {
                toast.error(
                  "4-5 курс может записываться только с 17:00 до 19:00"
                );
                return;
              }
            } else if (course >= 1 && course <= 3) {
              if (currentHour < 19 || currentHour >= 23) {
                toast.error(
                  "1-3 курс может записываться только с 19:00 до 23:00"
                );
                return;
              }
            } else {
              toast.error(
                "Некорректный номер группы. Первая цифра должна быть курсом (1-5)"
              );
              return;
            }

            await dutyService.create(data);

            const formattedDate = data.date.toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            toast.success(`Вы записаны на ${formattedDate}`);

            setTimeout(() => {
              router.push(ROUTE.DUTY());
            }, 1500);
          } catch (error) {
            console.error("Ошибка при записи:", error);
            toast.error("Не удалось записаться");
            fetchDutyData();
          }
        }}
      >
        {(form) => {
          useEffect(() => {
            const subscription = form.watch((value) => {
              formDataRef.current = value;
            });
            return () => subscription.unsubscribe();
          }, [form]);

          useEffect(() => {
            if (form.formState.errors?.date) {
              toast.error("Выберите дату записи");
            }
          }, [form.formState.errors?.date]);

          return (
            <>
              <CommonWrapperForm
                title="Данные"
                styleChildren="grid md:grid-cols-3 items-center gap-4"
              >
                <p>Запись на {id} этаж</p>
                <CommonTextField
                  label="Имя"
                  name="first_name"
                  placeholder="Иван"
                  form={form}
                  allowedPattern={/^[а-яёА-ЯЁ]*$/}
                />
                <CommonTextField
                  label="Фамилия"
                  name="last_name"
                  placeholder="Иванович"
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
                  label="Телефон"
                  name="phone"
                  form={form}
                  placeholder="+79991112266"
                  mask={(e) => {
                    const cleaned = e.replace(/[^\d+]/g, "");
                    if (!cleaned.startsWith("+7")) {
                      return "+7";
                    }
                    return cleaned;
                  }}
                  allowedPattern={/^\+7\d{0,10}$/}
                />
                <CommonSelectFields
                  label="Факультет"
                  name="faculty"
                  form={form}
                  options={[
                    {
                      key: "dental",
                      value: "Стоматологический",
                    },
                    {
                      key: "pediatric",
                      value: "Педиатрический",
                    },
                    {
                      key: "medical",
                      value: "Лечебный",
                    },
                  ]}
                />
                <CommonTextField
                  label="Номер комнаты"
                  name="room"
                  form={form}
                  placeholder="404"
                  allowedPattern={/^[0-9]{0,4}$/}
                />
                <CommonTextField
                  label="Номер группы"
                  name="group"
                  form={form}
                  placeholder="Пример: 209"
                  allowedPattern={/^[0-9]{0,3}$/}
                />
              </CommonWrapperForm>

              <div className="mt-6">
                <CalendarDuty
                  form={form}
                  name="date"
                  disabledDates={duty.map(
                    (item) => new Date(item.date) || loading
                  )}
                />
              </div>

              <Button type="submit" className="mt-5 w-full">
                Записаться
              </Button>
            </>
          );
        }}
      </CommonFrom>
    </CommonWrapper>
  );
}
