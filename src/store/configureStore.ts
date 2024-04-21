import {
  configureStore,
  type ThunkAction,
  // 미들웨어를 다른방법으로 추가할수 있는 방법 찾아야함
} from "@reduxjs/toolkit";
import rootReducer, { type IState } from "./modules";
// import { getLoadingMiddleware } from "commons/loading/store/loadingR";

export type Store = ReturnType<typeof initStore>;
export type Dispatch = Store["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IState,
  unknown,
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
