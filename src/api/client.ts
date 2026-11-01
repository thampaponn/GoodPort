import axios from "axios";
import { API_URL } from "../config/env";

export const api = axios.create({ baseURL: API_URL });

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error) && !error.response) {
    return "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาลองใหม่อีกครั้ง";
  }
  return fallback;
};
