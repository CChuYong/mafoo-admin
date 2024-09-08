import axios from "axios";
import { getSession } from 'next-auth/react'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000,
});

instance.interceptors.request.use(
  async (config) => {
    // 세션을 가져오기
    const session = await getSession();

    // 액세스 토큰이 있는 경우, 헤더에 추가
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
