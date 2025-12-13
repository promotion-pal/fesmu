import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./core/dataProvider";
import { TenantList } from "./resources/tenant";
import { DutyList } from "./resources/duty";
import { VocationList } from "./resources/vocations";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="tenants" list={TenantList} options={{ label: "Житель" }} />
    <Resource name="duty" list={DutyList} options={{ label: "Дежурство" }} />
    <Resource
      name="vocations"
      list={VocationList}
      options={{ label: "Каникулы" }}
    />
  </Admin>
);
