import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchData} from "../services/fetchData";
import {DataProps, SearchSchema} from "../types/SearchSchema";

const initialState: SearchSchema = {
    data: [],
    isLoading: false,
    error: undefined,
    url: '',
    page: 1
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        setUrl(state, action: PayloadAction<string>) {
            state.url = action.payload
        },
        setData(state, action) {
            state.data = action.payload
        },
        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<DataProps>) => {
                if (action.payload.results?.length === 0) {
                    state.isLoading = false
                    state.noResult = 'Unfortunately, the search did not yield results'
                }
                if (action.payload?.results?.length) {
                    state.isLoading = false
                    state.error = undefined
                    state.noResult = undefined
                    state.data = action.payload.results
                }
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    }
})

export const {reducer: searchReducer} = searchSlice
export const {actions: searchActions} = searchSlice