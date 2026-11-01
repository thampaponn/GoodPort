import { AdvisorPost, AdvisorPostComment, NewAdvisorPost } from "../types/models";
import { api } from "./client";

export const fetchAdvisorPosts = async () => {
  const { data } = await api.get<AdvisorPost[]>("/post-advisor");
  return data;
};

export const fetchAdvisorPost = async (id: string) => {
  const { data } = await api.post<AdvisorPost>(`/post-advisor/${id}`);
  return data;
};

export const fetchAdvisorPostsByUser = async (userId: string) => {
  const { data } = await api.get<AdvisorPost[]>(`/post-advisor/getByUserId/${userId}`);
  return data;
};

export const createAdvisorPost = async (post: NewAdvisorPost) => {
  const { data } = await api.post<AdvisorPost>("/post-advisor", post);
  return data;
};

export const updateAdvisorPost = async (id: string, changes: Partial<NewAdvisorPost>) => {
  const { data } = await api.put<AdvisorPost>(`/post-advisor/${id}`, changes);
  return data;
};

export const addAdvisorPostComment = async (postId: string, comment: AdvisorPostComment) => {
  const { data } = await api.post<AdvisorPost>(`/post-advisor/addComment/${postId}`, comment);
  return data;
};
