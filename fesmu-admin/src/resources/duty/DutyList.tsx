import {
  List,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
  RaRecord,
  SelectInput,
  Filter,
  TextInput,
} from "react-admin";
import jsonExport from "jsonexport/dist";

type FacultyType = "pediatric" | "medical" | "dental" | "pharmaceutical";

interface Tenant {
  room: string;
  group: string;
  last_name: string;
  first_name: string;
  patronymic: string;
  faculty: FacultyType;
}

interface Duty extends RaRecord {
  date: string;
  tenant: Tenant;
}

const facultyMap: Record<FacultyType, string> = {
  dental: "СТОМ",
  medical: "ЛЕЧ",
  pediatric: "ПЕД",
  pharmaceutical: "ФАРМ",
};

const DutyFilter = (props: any) => (
  <Filter {...props}>
    <SelectInput
      source="floor.number"
      label="Этаж"
      choices={[
        { id: 1, name: "1 этаж" },
        { id: 2, name: "2 этаж" },
        { id: 3, name: "3 этаж" },
        { id: 4, name: "4 этаж" },
        { id: 5, name: "5 этаж" },
        { id: 6, name: "6 этаж" },
        { id: 7, name: "7 этаж" },
        { id: 8, name: "8 этаж" },
        { id: 9, name: "9 этаж" },
        { id: 10, name: "10 этаж" },
        { id: 11, name: "11 этаж" },
        { id: 12, name: "12 этаж" },
        { id: 13, name: "13 этаж" },
        { id: 14, name: "14 этаж" },
      ]}
      alwaysOn
    />
    <TextInput source="tenant.room" label="Комната" />
    <SelectInput
      source="tenant.faculty"
      label="Факультет"
      choices={[
        { id: "pediatric", name: "Педиатрический" },
        { id: "medical", name: "Лечебный" },
        { id: "dental", name: "Стоматологический" },
        { id: "pharmaceutical", name: "Фармацевтический" },
      ]}
    />
  </Filter>
);

const DutyList = () => {
  const exporter = (duties: Duty[]) => {
    const dutiesForExport = duties.map((duty) => {
      return {
        Дата: new Date(duty.date).toLocaleDateString("ru-RU"),
        Дежурный:
          `${duty.tenant.last_name} ${duty.tenant.first_name} ${duty.tenant.patronymic}`.trim(),
        "Группа и факультет": `${duty.tenant.group} ${facultyMap[duty.tenant.faculty]}`,
        Комната: duty.tenant.room,
      };
    });

    jsonExport(
      dutiesForExport,
      {
        headers: ["Дата", "Дежурный", "Группа и факультет", "Комната"],
      },
      (err, csv) => {
        const BOM = "\uFEFF";
        const blob = new Blob([BOM + csv], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "дежурства.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
    );
  };

  return (
    <List filters={<DutyFilter />} exporter={exporter}>
      <Datagrid>
        <DateField
          source="date"
          label="Дата"
          locales="ru-RU"
          options={{
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }}
        />

        <TextField source="floor.number" label="Этаж" />

        <FunctionField
          label="Дежурный"
          render={(record) => (
            <div>
              <div>{record.tenant.last_name}</div>
              <div>
                {record.tenant.first_name} {record.tenant.patronymic}
              </div>
            </div>
          )}
        />
        <FunctionField
          label="Комната/Группа"
          render={(record) =>
            `к. ${record.tenant.room}, гр. ${record.tenant.group}, ${record.tenant.faculty}`
          }
        />

        <TextField source="tenant.phone" label="Телефон" />
      </Datagrid>
    </List>
  );
};

export { DutyList };
