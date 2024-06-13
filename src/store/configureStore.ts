import { configureStore, type ThunkAction } from "@reduxjs/toolkit";
import rootReducer, { type IState } from "./modules";
// import { getLoadingMiddleware } from "commons/loading/store/loadingR";

export type Store = ReturnType<typeof initStore>;
export type Dispatch = Store["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IState,
  unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
>;

// store 생성 함수
export const initStore = () => {
  const store = configureStore({
    // reducer 등록
    reducer: rootReducer,
    // preloadedState,
    // 디버깅 미들웨어 등록
    middleware: gDM => gDM({ serializableCheck: false }),
    // gDM({
    //   thunk: {
    //     extraArgument: {
    //       store: () => store
    //     },
    //   },
    //   serializableCheck: false,
    //   /** 부분 로딩을 적용하기 위한 미들웨어 등록 */
    // }).prepend(getLoadingMiddleware()),
    devTools: process.env.NODE_ENV !== "production",
  });
  return store;
};
