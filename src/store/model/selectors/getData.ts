import {StateSchema} from "../../store";

export const getData = (state: StateSchema) => state?.search?.data

export const getIsLoading = (state: StateSchema) => state?.search?.isLoading

export const getError = (state: StateSchema) => state?.search?.error as string

export const getNoResult = (state: StateSchema) => state?.search?.noResult

export const getUrl = (state: StateSchema) => state?.search?.url || ''

export const getPageNum = (state: StateSchema) => state?.search?.page || 1