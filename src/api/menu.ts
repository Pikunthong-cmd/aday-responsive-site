import { adayApiClient } from "../lib/client";


export const menuAPI = {
  getAll: async () => {
    const res = await adayApiClient.get("/menu");
    return res.data;
  },

//   getUserById: async (id: number) => {
//     const res = await adayApiClient.get(`/users/${id}`);
//     return res.data;
//   },

//   createUser: async (userData: unknown) => {
//     const res = await adayApiClient.post("/users", userData);
//     return res.data;
//   },

//   updateUser: async (id: number, userData: unknown) => {
//     const res = await adayApiClient.patch(`/users/${id}`, userData);
//     return res.data;
//   },

//   searchUser: async (search: string) => {
//     const res = await adayApiClient.get("/users", {
//       params: { searchText: search },
//     });
//     return res.data;
//   },
};
