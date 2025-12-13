import { List, Datagrid, TextField, DateField, NumberField } from "react-admin";

const VocationList = () => {
  return (
    <List>
      <Datagrid rowClick="show">
        <NumberField source="id" label="ID" />

        <TextField source="firstName" label="Имя" />
        <TextField source="lastName" label="Фамилия" />
        <TextField source="patronymic" label="Отчество" />

        <NumberField source="floorNumber" label="Этаж" />
        <TextField source="room" label="Комната" />

        <DateField source="arrivalDate" label="Дата выезда" />
        <DateField source="departureDate" label="Дата возврата" />
        <DateField source="createdAt" label="Создано" />
      </Datagrid>
    </List>
  );
};

export { VocationList };
