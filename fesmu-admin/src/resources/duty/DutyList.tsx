// import {
//   List,
//   Datagrid,
//   TextField,
//   DateField,
//   FunctionField,
// } from "react-admin";

// const DutyList = () => {
//   return (
//     <List>
//       <Datagrid>
//         <DateField
//           source="date"
//           label="Дата"
//           locales="ru-RU"
//           options={{
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//           }}
//         />

//         <TextField source="floor.number" label="Этаж" />

//         <FunctionField
//           label="Дежурный"
//           render={(record) => (
//             <div>
//               <div>{record.tenant.last_name}</div>
//               <div>
//                 {record.tenant.first_name} {record.tenant.patronymic}
//               </div>
//             </div>
//           )}
//         />
//         <FunctionField
//           label="Комната/Группа"
//           render={(record) =>
//             `к. ${record.tenant.room}, гр. ${record.tenant.group}`
//           }
//         />

//         <TextField source="tenant.phone" label="Телефон" />
//       </Datagrid>
//     </List>
//   );
// };

// export { DutyList };

import {
  List,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
} from "react-admin";

// Функция экспорта с нужными полями
const exporter = (records) => {
  const dataForExport = records.map((record) => ({
    Дата: new Date(record.date).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    "ФИО дежурного": `${record.tenant.last_name} ${record.tenant.first_name} ${record.tenant.patronymic}`,
    Группа: record.tenant.group,
    Комната: record.tenant.room,
  }));

  return dataForExport;
};

const DutyList = () => {
  return (
    <List exporter={exporter}>
      <Datagrid>
        {/* Отображение в таблице (можно оставить как было или изменить) */}
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

        <FunctionField
          label="Дежурный"
          render={(record) =>
            `${record.tenant.last_name} ${record.tenant.first_name} ${record.tenant.patronymic}`
          }
        />

        <TextField source="tenant.group" label="Группа" />
        <TextField source="tenant.room" label="Комната" />
      </Datagrid>
    </List>
  );
};

export { DutyList };
