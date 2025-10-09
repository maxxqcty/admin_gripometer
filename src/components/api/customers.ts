import { apiFetch } from "./client";

export const getCustomers = () => apiFetch("/customers");
export const getCustomerById = (id: number) => apiFetch(`/customers/${id}`);
export const createCustomer = (data: any) =>
  apiFetch("/customers", { method: "POST", body: JSON.stringify(data) });


