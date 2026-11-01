import { Alert, NewAlert } from "../types/models";
import { api } from "./client";

export const createAlert = (alert: NewAlert) => api.post("/alert", alert);

export const fetchPendingAlerts = async (advisorId: string) => {
  const { data } = await api.get<Alert[]>(`/alert/byadvisorId/${advisorId}`);
  return data;
};

export const fetchConfirmedAlerts = async (userId: string) => {
  const { data } = await api.get<Alert[]>(`/alert/byUserIdConfirm/${userId}`);
  return data;
};

export const acceptAlert = (advisorId: string, postId: string) =>
  api.post(`/alert/updateDetailToAccepted/${advisorId}/${postId}`);
