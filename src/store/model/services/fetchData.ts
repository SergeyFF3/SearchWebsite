import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {baseURL} from "../../../axios/url"
import {DataProps} from "../types/SearchSchema";

export const fetchData = createAsyncThunk<DataProps, string, { rejectValue: string }>(
    'search/fetchData',
    async (url, thunkAPI) => {
        try {
            const res = await axios.get<DataProps>(`${baseURL}${url}`, {
                params: {
                    per_page: 30
                }
            })
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Data loading error')
        }
    }
)