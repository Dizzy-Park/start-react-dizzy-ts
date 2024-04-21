import axios, { type AxiosInstance } from "axios";
import { config } from "./config";

/**
 * axios 생성
 */
const Http: AxiosInstance = axios.create({
  baseURL: config.Url.BACKEND_URL,
  headers: {
    // enctype: "multipart/form-data",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Accept: "application/hal+json",
  },
  paramsSerializer: {
    encode: encodeURIComponent,
    indexes: null,
  },
});

/**
 * 서버에서 반환되는 JSON 값 설정
 * 각 프로젝트 대응을 위해 RES 리턴을 상속 구현으로 변경처리
 */
export interface AbsIRes<T, P = undefined> {
  apiLink?: string;
  code: number;
  content?: T;
  success?: boolean;
  message: string;
  page?: P;
  status?: number;
}

export default Http;

/**
 * 로그인 연결
 */
export const Http2: AxiosInstance = axios.create({
  baseURL: config.Url.BACKEND_URL,
  headers: {
    // enctype: "multipart/form-data",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Accept: "application/hal+json",
  },
  paramsSerializer: {
    encode: encodeURIComponent,
    indexes: null,
  },
});

/**
 * 이전 api 연결
 */
export const HttpR: AxiosInstance = axios.create({
  baseURL: config.Url.BACKEND_R_URL,
  headers: {
    // enctype: "multipart/form-data",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Accept: "application/hal+json",
  },
  paramsSerializer: {
    encode: encodeURIComponent,
    indexes: null,
  },
});

/**
 * 뷰어스 통합로그인 연결
 */
export const HttpLogin: AxiosInstance = axios.create({
  baseURL: config.Url.BACKEND_LOGIN_URL,
  headers: {
    // enctype: "multipart/form-data",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Accept: "application/hal+json",
  },
  paramsSerializer: {
    encode: encodeURIComponent,
    indexes: null,
  },
});
