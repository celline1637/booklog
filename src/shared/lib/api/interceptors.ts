import { request } from "./request";

// 요청 인터셉터
request.interceptors.request.use(
  (config) =>
    // 요청 보내기 전에 수행 로직
    config,
  (err) =>
    // 요청 에러 시 수행 로직
    Promise.reject(err)
);

// 응답 인터셉터
request.interceptors.response.use(
  (response) => {
    // 응답에 대한 로직
    const res = response.data;
    return res;
  },
  (err) => Promise.reject(err)
);
