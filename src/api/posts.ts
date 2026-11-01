import { NewPost, Post, PostCategory } from "../types/models";
import { api } from "./client";

export const fetchRecentPosts = async () => {
  const { data } = await api.get<Post[]>("/post/last-7-days");
  return data;
};

export const fetchPost = async (id: string) => {
  const { data } = await api.post<Post>(`/post/${id}`);
  return data;
};

export const fetchUserPostsByCategory = async (category: PostCategory, userId: string) => {
  const { data } = await api.get<Post[]>(`/post/category/${category}/${userId}`);
  return data;
};

export const createPost = async (post: NewPost) => {
  const { data } = await api.post<Post>("/post", post);
  return data;
};

export const acceptPost = (id: string) => api.post(`/post/updateStatusToAccepted/${id}`);
