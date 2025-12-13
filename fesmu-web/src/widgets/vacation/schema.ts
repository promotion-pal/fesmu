import { z } from "zod";

const schemaVacation = z
  .object({
    floorNumber: z.coerce.number(),
    firstName: z.string().min(1, "Имя не может быть пустым"),
    lastName: z.string().min(1, "Фамилия не может быть пустой"),
    patronymic: z.string().optional(),
    room: z
      .string()
      .min(1, "Номер комнаты обязателен")
      .regex(/^[1-9]\d{0,3}$/, "Должно быть положительное число"),

    arrivalDate: z.date(),
    departureDate: z.date(),
  })
  .refine(
    (data) => {
      return data.departureDate > data.arrivalDate;
    },
    {
      message: "Дата уезда должна быть позже даты приезда",
      path: ["departure_date"],
    }
  );

type CreateVocation = z.infer<typeof schemaVacation>;

export { schemaVacation, type CreateVocation };
