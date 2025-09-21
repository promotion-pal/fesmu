import { Datagrid, List, TextField } from "react-admin";

const TenantList = () => {
  return (
    <List>
      <Datagrid>
        <TextField source="first_name" label="Имя" />
      </Datagrid>
    </List>
  );
};
export { TenantList };
