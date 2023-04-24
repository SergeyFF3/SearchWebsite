import {createAsyncThunk} from '@reduxjs/toolkit';
import {getData, getPageNum, getUrl} from "../selectors/getData";
import {StateSchema} from "../../store";
import {searchActions} from '../slices/searchSlice';
import axios from "axios";
import {DataProps} from "../types/SearchSchema";
import {baseURL} from "../../../axios/url";

export const fetchNextDataPage = createAsyncThunk<void, void, { state: StateSchema }>(
    'search/fetchNextDataPage',
    async (_, thunkApi) => {
        const {getState, dispatch} = thunkApi;
        const page = getPageNum(getState());
        const url = getUrl(getState());
        const data = getData(getState());

        dispatch(searchActions.setPage(page + 1));
        dispatch(searchActions.setIsLoading(true));

        const res = await axios.get<DataProps>(`${baseURL}${url}`, {
            params: {
                per_page: 30,
                page: page + 1
            }
        })
        dispatch(searchActions.setIsLoading(false));
        if (res.data.results) {
            dispatch(searchActions.setData(data?.concat(res?.data?.results)))
        }
    },
);