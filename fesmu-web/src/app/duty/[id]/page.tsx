"use client";

import { ROUTE } from "@/config/path";
import { dutyService } from "@/features/api/duty";
import { Duty } from "@/features/api/duty";
import { CommonFrom } from "@/features/form";
import { CommonSelectFields, CommonTextField } from "@/features/form/fields";
import { CalendarDuty } from "@/shared/calendar-duty";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { CommonWrapper, WrapperProps } from "@/widgets/common/wrapper";
import { schemaTenantDuty } from "@/widgets/duty/schema";
import { useParams, useRouter } from "next/navigation";
import { FC, useEffect, useState, useRef } from "react";
import { toast } from "sonner";

const WrapperForm: FC<WrapperProps> = ({
  title,
  children,
  styleWrapper,
  styleChildren,
}) => (
  <div className={cn("rounded-lg shadow-sm px-3 py-3", styleWrapper)}>
    <p className="text-lg mb-5">{title}</p>
    <div className={cn(styleChildren)}>{children}</div>
  </div>
);

export default function RecordDutyPage() {
  const params = useParams();
  const id = params.id as string;

  const [duty, setDuty] = useState<Duty[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const formDataRef = useRef<any>(null);

  const fetchDutyData = async () => {
    try {
      setLoading(true);
      const res = await dutyService.getRecorded(Number(id));
      setDuty(res);
      setLastUpdate(new Date());
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
      <div className="flex justify-between items-center mb-4 p-2 bg-blue-50 rounded-lg">
        <span className="text-sm text-blue-700">
          {loading ? "Обновление данных..." : "Данные обновлены"}
        </span>
        {lastUpdate && (
          <span className="text-xs text-blue-600">
            Последнее обновление: {lastUpdate.toLocaleTimeString()}
          </span>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={fetchDutyData}
          disabled={loading}
        >
          {loading ? "Обновление..." : "Обновить"}
        </Button>
      </div>

      <CommonFrom
        schema={schemaTenantDuty}
        defaultValues={{
          floorNumber: Number(id),
          phone: "+7",
          last_name: "",
          first_name: "",
          patronymic: "",
          room: "",
          faculty: "pediatric",
          group: "",
          date: new Date(),
        }}
        onSubmit={async (data) => {
          try {
            await dutyService.create(data);
            toast.success("Вы записаны");
            setTimeout(() => {
              router.push(ROUTE.DUTY());
            }, 1000);
          } catch (error) {
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

          return (
            <>
              <WrapperForm
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
              </WrapperForm>

              <div className="mt-6">
                {/* {loading ? (
                  <div className="flex justify-center items-center py-8 border rounded-lg">
                    <p className="text-gray-500">Загрузка доступных дат...</p>
                  </div>
                ) : (
                  <CalendarDuty
                    form={form}
                    name="date"
                    disabledDates={duty.map(
                      (item) => new Date(item.date) || loading
                    )}
                  />
                )} */}

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

// "use client";

// import { ROUTE } from "@/config/path";
// import { dutyService } from "@/features/api/duty";
// import { Duty } from "@/features/api/duty";
// import { CommonFrom } from "@/features/form";
// import { CommonSelectFields, CommonTextField } from "@/features/form/fields";
// import { CalendarDuty } from "@/shared/calendar-duty";
// import { cn } from "@/shared/lib/utils";
// import { Button } from "@/shared/ui/button";
// import { CommonWrapper, WrapperProps } from "@/widgets/common/wrapper";
// import { schemaTenantDuty } from "@/widgets/duty/schema";
// import { useParams, useRouter } from "next/navigation";
// import { FC, useEffect, useState } from "react";
// import { toast } from "sonner";

// const WrapperForm: FC<WrapperProps> = ({
//   title,
//   children,
//   styleWrapper,
//   styleChildren,
// }) => (
//   <div className={cn("rounded-lg shadow-sm px-3 py-3", styleWrapper)}>
//     <p className="text-lg mb-5">{title}</p>
//     <div className={cn(styleChildren)}>{children}</div>
//   </div>
// );

// export default function RecordDutyPage() {
//   const params = useParams();
//   const id = params.id as string;

//   const [duty, setDuty] = useState<Duty[]>([]);

//   useEffect(() => {
//     dutyService.getRecorded(Number(id)).then((res) => {
//       setDuty(res);
//     });
//   }, []);

//   const router = useRouter();

//   return (
//     <CommonWrapper back={ROUTE.DUTY()} styleWrapper="container pb-10">
//       <CommonFrom
//         schema={schemaTenantDuty}
//         defaultValues={{
//           floorNumber: Number(id),
//           phone: "+7",
//           last_name: "",
//           first_name: "",
//           patronymic: "",
//           room: "",
//           faculty: "pediatric",
//           group: "",
//           date: new Date(),
//         }}
//         onSubmit={async (data) => {
//           try {
//             await dutyService.create(data);
//             toast("Вы записаны");
//             setTimeout(() => {
//               router.push(ROUTE.DUTY());
//             }, 1500);
//           } catch (error) {
//             console.log(error);
//             toast("Не удалось записаться");
//           }
//         }}
//       >
//         {(form) => (
//           <>
//             <WrapperForm
//               title="Данные"
//               styleChildren="grid md:grid-cols-3 items-center gap-4"
//             >
//               <p>Запись на {id} этаж</p>
//               <CommonTextField
//                 label="Имя"
//                 name="first_name"
//                 placeholder="Иван"
//                 form={form}
//                 allowedPattern={/^[а-яёА-ЯЁ]*$/}
//               />
//               <CommonTextField
//                 label="Фамилия"
//                 name="last_name"
//                 placeholder="Иванович"
//                 form={form}
//                 allowedPattern={/^[а-яёА-ЯЁ]*$/}
//               />
//               <CommonTextField
//                 label="Отчество"
//                 name="patronymic"
//                 placeholder="Иванов"
//                 form={form}
//                 allowedPattern={/^[а-яёА-ЯЁ]*$/}
//               />
//               <CommonTextField
//                 label="Телефон"
//                 name="phone"
//                 form={form}
//                 placeholder="+79991112266"
//                 mask={(e) => {
//                   const cleaned = e.replace(/[^\d+]/g, "");
//                   if (!cleaned.startsWith("+7")) {
//                     return "+7";
//                   }
//                   return cleaned;
//                 }}
//                 allowedPattern={/^\+7\d{0,10}$/}
//               />
//               <CommonSelectFields
//                 label="Факультет"
//                 name="faculty"
//                 form={form}
//                 options={[
//                   {
//                     key: "dental",
//                     value: "Стоматологический",
//                   },
//                   {
//                     key: "pediatric",
//                     value: "Педиатрический",
//                   },
//                   {
//                     key: "medical",
//                     value: "Лечебный",
//                   },
//                 ]}
//               />
//               <CommonTextField
//                 label="Номер комнаты"
//                 name="room"
//                 form={form}
//                 placeholder="404"
//                 allowedPattern={/^[0-9]{0,4}$/}
//               />
//               <CommonTextField
//                 label="Номер группы"
//                 name="group"
//                 form={form}
//                 placeholder="Пример: 209"
//                 allowedPattern={/^[0-9]{0,3}$/}
//               />
//             </WrapperForm>

//             <CalendarDuty
//               form={form}
//               name="date"
//               disabledDates={duty.map((item) => new Date(item.date))}
//             />

//             <Button type="submit" variant="secondary" className="mt-5 w-full">
//               Записаться
//             </Button>
//           </>
//         )}
//       </CommonFrom>
//     </CommonWrapper>
//   );
// }
