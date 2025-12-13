import {
  List,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
  RaRecord,
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

const DutyList = () => {
  const exporter = (duties: Duty[]) => {
    const filteredByFloor = duties.filter((duty) => {
      return true;
    });

    const sortedByFloor = [...filteredByFloor].sort(
      (a, b) => a.floor.number - b.floor.number,
    );

    const sortedByFloorAndDate = sortedByFloor.sort((a, b) => {
      const floorComparison = a.floor.number - b.floor.number;
      if (floorComparison !== 0) {
        return floorComparison;
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const dutiesForExport = sortedByFloorAndDate.map((duty) => {
      return {
        Дата: new Date(duty.date).toLocaleDateString("ru-RU"),
        Этаж: duty.floor.number,
        Дежурный:
          `${duty.tenant.last_name} ${duty.tenant.first_name} ${duty.tenant.patronymic}`.trim(),
        "Группа и факультет": `${duty.tenant.group} ${facultyMap[duty.tenant.faculty]}`,
        Комната: duty.tenant.room,
      };
    });

    jsonExport(
      dutiesForExport,
      {
        headers: ["Дата", "Этаж", "Дежурный", "Группа и факультет", "Комната"],
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
    <List exporter={exporter}>
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
