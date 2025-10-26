import {
  List,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
  downloadCSV,
  BulkExportButton,
} from "react-admin";
import jsonExport from 'jsonexport/dist';

const DutyList = () => {
  // Функция для преобразования данных перед экспортом
  const exporter = (records, fetchRelatedRecords) => {
    const dataForExport = records.map(record => ({
      'Дата': new Date(record.date).toLocaleDateString('ru-RU'),
      'Этаж': record.floor.number,
      'Фамилия': record.tenant.last_name,
      'Имя': record.tenant.first_name,
      'Отчество': record.tenant.patronymic,
      'Комната': record.tenant.room,
      'Группа': record.tenant.group,
      'Факультет': record.tenant.faculty,
      'Телефон': record.tenant.phone,
    }));

    jsonExport(dataForExport, {
      headers: ['Дата', 'Этаж', 'Фамилия', 'Имя', 'Отчество', 'Комната', 'Группа', 'Факультет', 'Телефон']
    }, (err, csv) => {
      downloadCSV(csv, 'дежурства');
    });
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
            `к. ${record.tenant.room}, гр. ${record.tenant.group}, фак. ${record.tenant.faculty}`
          }
        />
        <TextField source="tenant.phone" label="Телефон" />
      </Datagrid>
    </List>
  );
};

export { DutyList };

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
//             `к. ${record.tenant.room}, гр. ${record.tenant.group}, фак. ${record.tenant.faculty}}`
//           }
//         />

//         <TextField source="tenant.phone" label="Телефон" />
//       </Datagrid>
//     </List>
//   );
// };

// export { DutyList };
