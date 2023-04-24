import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {searchReducer} from "./model/slices/searchSlice";
import {SearchSchema} from "./model/types/SearchSchema";

export interface StateSchema {
    search: SearchSchema
}

export const store = configureStore<StateSchema>({
    reducer: {
        search: searchReducer
    }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch