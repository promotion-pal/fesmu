import { z } from "zod";

const FacultyZodEnum = z.enum([
  "dental",
  "medical",
  "pediatric",
  "pharmaceutical",
]);

const schemaDuty = z.object({
  floorNumber: z.coerce.number(),
  date: z.date(),
});

const schemaTenant = z.object({
  phone: z.string(),
  last_name: z.string(),
  first_name: z.string(),
  patronymic: z.string(),
  room: z
    .string()
    .min(1, "Номер комнаты обязателен")
    .regex(/^[1-9]\d{0,3}$/, "Должно быть положительное число"),
  faculty: FacultyZodEnum,
  group: z.string(),
});

const schemaTenantDuty = schemaTenant.extend(schemaDuty.shape);

type CreateDuty = z.infer<typeof schemaTenantDuty>;

export { schemaDuty, schemaTenant, schemaTenantDuty, type CreateDuty };
