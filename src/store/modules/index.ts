"use client";

import CommonsSlim from "commons/store/CommonsSlim";
import { combineReducers } from "redux";
import { type ICommonsStore } from "/commons";
/**
 * state interface 설정
 */
export interface IState extends ICommonsStore {}

/**
 * 베이스 reducer 설정
 * @param state 상태를 담고있는 변수
 * @param action 행동에 의해 변화되는 값들
 * @returns
 */

const defaultReducers = combineReducers({ ...CommonsSlim() });

export default defaultReducers;
