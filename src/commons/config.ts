export interface IURL {
  BACKEND_URL?: string;
  BACKEND_R_URL?: string;
  BACKEND_LOGIN_URL?: string;
  BACKEND_URL_CAR?: string;
}

export interface IConfig {
  Env?: string;
  Url: IURL;
  token: {
    name: string;
    header: string;
  };
}

const inappAgent = "vbridge";

export const isInApp = () => {
  return (
    window.navigator.userAgent.toLocaleLowerCase().indexOf(inappAgent) > -1
  );
};

export const config: IConfig = {
  Env: process.env.NODE_ENV,
  token: {
    name: "token",
    header: "Authorization",
  },
  Url: {
    BACKEND_URL:
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_UI_ENV === "local" &&
      typeof window !== "undefined" &&
      isInApp()
        ? "http://10.0.2.2:4000"
        : process.env.NEXT_PUBLIC_BACKEND_URL,
    BACKEND_R_URL: process.env.NEXT_PUBLIC_BACKEND_R_URL,
  },
};
