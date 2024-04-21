import type { AsyncThunk, AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import type { AbsIRes } from "commons/Http";
import {
  absCreatePageThunk,
  absCreateThunk,
  type AbsAsyncThunkConfig,
  type StatePayloadCodeType,
  useAbsApi,
  type ApiResultErrorCallBack,
} from "commons/store/common";
import type { IState } from ".";
import { useState } from "react";
import type { Dispatch } from "../configureStore";

/**
 * DEFAULT 콘텐츠가 없습니다"
 * DATA_NONE 데이터를 불러올 수 없습니다
 * SEARCH_NONE 검색결과가 없습니다
 * ARTICLE_NONE 기사목록이 없습니다
 */
export enum NoneSentence {
  DEFAULT = "콘텐츠가 없습니다",
  DATA_NONE = "데이터를 불러올 수 없습니다",
  SEARCH_NONE = "검색결과가 없습니다",
  ARTICLE_NONE = "기사목록이 없습니다",
}

export interface IList<T> {
  page_info: IPageable;
  list: Array<T>;
}

/**
 * @interface IPageable
 * @param total_elements 총 데이터 갯수
 * @param page 현재 페이지
 * @param size 페이지당 보여질 갯수
 * @param sort 현재 정렬된 기준(백엔드와 맞춰야 함)
 */
export interface IPageable {
  total_elements?: number;
  page: number;
  size: number;
  sort?: string;
}

export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export type AsyncThunkConfig = AbsAsyncThunkConfig<IState> & {
  dispatch?: Dispatch;
};

export interface IRes<T, P = undefined> extends AbsIRes<T, P> {
  // AD 공통 사용중 단일 데이터 data, 페이지 데이터 page
  data?: T;
  list?: Array<P>;
  page_info?: IPageable;
}

/**
 *
 * @param type
 * @param thunk
 * @returns
 */
export const createAppThunk = <Returned, ThunkArg = undefined>(
  type: string,
  thunk: AsyncThunkPayloadCreator<IRes<Returned>, ThunkArg, AsyncThunkConfig>
): AsyncThunk<IRes<Returned>, ThunkArg, AsyncThunkConfig> => {
  return absCreateThunk<IState, IRes<Returned>, Returned, ThunkArg>(
    type,
    thunk
  );
};

export const createAppParamThunk = <ThunkArg = undefined>(
  type: string,
  thunk: AsyncThunkPayloadCreator<IRes<undefined>, ThunkArg, AsyncThunkConfig>
): AsyncThunk<IRes<undefined>, ThunkArg, AsyncThunkConfig> => {
  return absCreateThunk<IState, IRes<undefined>, undefined, ThunkArg>(
    type,
    thunk
  );
};

export const createAppPageThunk = <
  Returned,
  Pageable = undefined,
  ThunkArg = undefined,
>(
  type: string,
  thunk: AsyncThunkPayloadCreator<
    IRes<Returned, Pageable>,
    ThunkArg,
    AsyncThunkConfig
  >
): AsyncThunk<IRes<Returned, Pageable>, ThunkArg, AsyncThunkConfig> => {
  return absCreatePageThunk<
    IState,
    IRes<Returned, Pageable>,
    Returned,
    ThunkArg,
    Pageable
  >(type, thunk);
};

export const useApi = () => {
  const absApi = useAbsApi<IState>(
    undefined,
    undefined,
    statePayloadCode,
    () => {
      // 공통 통신 실패 처리 대기중
    }
  );
  const apiResult = async <Returned, Pageable, ThunkArg>(value: {
    thunk: AsyncThunk<IRes<Returned, Pageable>, ThunkArg, AsyncThunkConfig>;
    param?: ThunkArg;
    errorCallback?: ApiResultErrorCallBack;
  }): Promise<IRes<Returned, Pageable> | undefined> => {
    return await absApi.apiResult(
      value.thunk,
      value.param,
      value.errorCallback
    );
  };
  return { apiResult };
};

function statePayloadCode(code: number): StatePayloadCodeType {
  if (code > -1) {
    return "success";
  } else {
    return "error";
  }
}

export type callType = "start" | "next" | "re";
type APIFunction = () => Promise<void>;

export const useError = () => {
  const [is, setIs] = useState(false);
  const [isData, setIsData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const setError = ($message: string) => {
    setIs(true);
    setLoading(false);
    setMessage($message);
  };
  const apiCall = async (back: APIFunction) => {
    setIs(false);
    setLoading(true);
    return await back();
  };
  const setSucess = ($message?: string) => {
    setLoading(false);
    if ($message !== undefined) {
      setIs(true);
      setMessage($message);
    } else {
      setIsData(true);
    }
  };
  const stateReset = () => {
    setIs(false);
    setLoading(false);
    setMessage(undefined);
  };
  return {
    is,
    isData,
    loading,
    message,
    setError,
    apiCall,
    setSucess,
    stateReset,
  };
};
