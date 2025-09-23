import {
  CreateParams,
  DeleteManyParams,
  DeleteParams,
  fetchUtils,
} from "react-admin";

const apiUrl = "http://api.fesmu.promotion-pal.ru";
// const apiUrl = process.env.REACT_APP_API;
const httpClient = fetchUtils.fetchJson;

export const dataProvider = {
  getList: async (resource: string) => {
    const url = `${apiUrl}/${resource}`;
    return httpClient(url).then(({ json }) => {
      return {
        data: json,
        total: json.length,
      };
    });
  },

  create: async (resource: string, params: CreateParams) => {
    const { json } = await httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  delete: async (resource: string, params: DeleteParams) => {
    await httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: params.previousData };
  },

  deleteMany: async (resource: string, params: DeleteManyParams) => {
    await Promise.all(
      params.ids.map((id) => {
        dataProvider.delete(resource, {
          id,
          previousData: { id },
        });
      }),
    );

    return { data: params.ids.map((id) => ({ id })) };
  },
};
