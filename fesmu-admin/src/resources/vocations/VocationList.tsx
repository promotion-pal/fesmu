import jsonexport from "jsonexport/dist";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  RaRecord,
  Identifier,
} from "react-admin";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface Vocation extends RaRecord<Identifier> {
  id: number;
  room: number;
  createdAt: Date;
  lastName: string;
  firstName: string;
  patronymic: string;
  arrivalDate: Date;
  floorNumber: number;
  departureDate: Date;
}

const VocationList = () => {
  const exporter = (data: RaRecord<Identifier>[]) => {
    const vocationData = data as Vocation[];

    const vocationForExport = vocationData.map((vocation) => {
      const arrivalDate = format(new Date(vocation.arrivalDate), "dd.MM.yyyy", {
        locale: ru,
      });
      const departureDate = format(
        new Date(vocation.departureDate),
        "dd.MM.yyyy",
        { locale: ru },
      );

      return {
        Комната: vocation.room,
        ФИО: `${vocation.lastName} ${vocation.firstName} ${vocation.patronymic} `,
        "Дата отъезда-приезда": `${arrivalDate} - ${departureDate}`,
      };
    });

    jsonexport(
      vocationForExport,
      {
        headers: ["Комната", "ФИО", "Дата отъезда-приезда"],
      },
      (err, csv) => {
        if (err) {
          console.error("Ошибка при экспорте:", err);
          return;
        }

        const BOM = "\uFEFF";
        const blob = new Blob([BOM + csv], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Каникулы_${vocationData[0]?.floorNumber || "неизвестный"}_этаж.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
    );
  };

  return (
    <List exporter={exporter}>
      <Datagrid rowClick="show">
        <NumberField source="id" label="ID" />
        <TextField source="firstName" label="Имя" />
        <TextField source="lastName" label="Фамилия" />
        <TextField source="patronymic" label="Отчество" />
        <NumberField source="floorNumber" label="Этаж" />
        <TextField source="room" label="Комната" />
        <DateField source="arrivalDate" label="Дата прибытия" locales="ru-RU" />
        <DateField
          source="departureDate"
          label="Дата отъезда"
          locales="ru-RU"
        />
        <DateField source="createdAt" label="Создано" locales="ru-RU" />
      </Datagrid>
    </List>
  );
};

export { VocationList };

// import jsonexport from "jsonexport/dist";
// import { format } from "date-fns";
// import {
//   List,
//   Datagrid,
//   TextField,
//   DateField,
//   NumberField,
//   RaRecord,
//   Identifier,
// } from "react-admin";

// interface Vocation extends RaRecord<Identifier> {
//   id: number;
//   room: number;
//   createdAt: Date;
//   lastName: string;
//   firstName: string;
//   patronymic: string;
//   arrivalDate: Date;
//   floorNumber: number;
//   departureDate: Date;
// }

// const VocationList = () => {
//   const exporter = (data: RaRecord<Identifier>[]) => {
//     const vocationData = data as Vocation[];

//     const arrivalDate = format(new Date(vocation.arrivalDate), "dd.MM.yyyy", {
//       locale: ru,
//     });
//     const departureDate = format(
//       new Date(vocation.departureDate),
//       "dd.MM.yyyy",
//       { locale: ru },
//     );

//     const vocationForExport = vocationData.map((vocation) => {
//       return {
//         Комната: vocation.room,
//         ФИО: `${vocation.lastName} ${vocation.firstName} ${vocation.patronymic} `,
//         "Дата отъезда-приезда": `${vocation.arrivalDate} - ${vocation.departureDate}`,
//       };
//     });

//     jsonexport(
//       vocationForExport,
//       {
//         headers: ["Комната", "ФИО", "Дата отъезда-приезда"],
//       },
//       (err, csv) => {
//         const BOM = "\uFEFF";
//         const blob = new Blob([BOM + csv], {
//           type: "text/csv;charset=utf-8;",
//         });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = `Каникулы_${vocationData[0].floorNumber}_этаж.csv`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//         URL.revokeObjectURL(url);
//       },
//     );
//   };

//   return (
//     <List exporter={exporter}>
//       <Datagrid rowClick="show">
//         <NumberField source="id" label="ID" />
//         <TextField source="firstName" label="Имя" />
//         <TextField source="lastName" label="Фамилия" />
//         <TextField source="patronymic" label="Отчество" />
//         <NumberField source="floorNumber" label="Этаж" />
//         <TextField source="room" label="Комната" />
//         <DateField source="arrivalDate" label="Дата прибытия" />
//         <DateField source="departureDate" label="Дата отъезда" />
//         <DateField source="createdAt" label="Создано" />
//       </Datagrid>
//     </List>
//   );
// };

// export { VocationList };
