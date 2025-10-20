import { Datagrid, List, TextField } from "react-admin";

const TenantList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="first_name" label="Имя" />
        <TextField source="last_name" label="Фамилия" />
        <TextField source="phone" label="Номер" />
        <TextField source="faculty" label="Факультет" />
        <TextField source="room" label="Комната" />
        <TextField source="group" label="Группа" />
      </Datagrid>
    </List>
  );
};
export { TenantList };
