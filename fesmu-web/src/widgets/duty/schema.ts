import { z } from "zod";

const FacultyZodEnum = z.enum([
  "dental",
  "medical",
  "pediatric",
  "pharmaceutical",
]);

const schemaDuty = z.object({
  date: z.date(),
  floorNumber: z.coerce.number(),
});

const schemaTenant = z.object({
  phone: z.string().min(1, "Телефон не может быть пустым"),
  last_name: z.string().min(1, "Фамилия не может быть пустой"),
  first_name: z.string().min(1, "Имя не может быть пустым"),
  patronymic: z.string(),
  room: z
    .string()
    .min(1, "Номер комнаты обязателен")
    .regex(/^[1-9]\d{0,3}$/, "Должно быть положительное число"),
  faculty: FacultyZodEnum,
  group: z.string().min(1, { message: "Номер группы обязателен" }),
});

const schemaTenantDuty = schemaTenant.extend(schemaDuty.shape);

type CreateDuty = z.infer<typeof schemaTenantDuty>;

export { schemaDuty, schemaTenant, schemaTenantDuty, type CreateDuty };
