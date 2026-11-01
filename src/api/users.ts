import { User } from "../types/models";
import { api } from "./client";

export type NewUser = Omit<User, "_id" | "createdAt"> & { password: string };

export const signInRequest = async (username: string, password: string) => {
  const { data } = await api.post<{ access_token: string }>("/auth/signin", { username, password });
  return data.access_token;
};

export const createUser = async (user: NewUser) => {
  const { data } = await api.post<User>("/user", user);
  return data;
};

export const fetchUser = async (id: string) => {
  const { data } = await api.post<User>(`/user/${id}`);
  return data;
};

export const fetchUsers = async () => {
  const { data } = await api.get<User[]>("/user");
  return data;
};

// Everyone who can be picked as a project advisor.
export const fetchAdvisorCandidates = async () => {
  const { data } = await api.get<User[]>("/user/with-roles");
  return data;
};

export const updateUser = async (id: string, changes: Partial<User>) => {
  const { data } = await api.put<User>(`/user/${id}`, changes);
  return data;
};
