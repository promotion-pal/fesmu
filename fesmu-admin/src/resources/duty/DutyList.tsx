import {
  List,
  Datagrid,
  TextField,
  DateField,
  FunctionField,
} from "react-admin";

const DutyList = () => {
  return (
    <List>
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
            `к. ${record.tenant.room}, гр. ${record.tenant.group}`
          }
        />

        <TextField source="tenant.phone" label="Телефон" />
      </Datagrid>
    </List>
  );
};

export { DutyList };
