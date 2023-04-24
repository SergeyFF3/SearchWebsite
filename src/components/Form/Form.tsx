import React, {memo, useCallback, useRef} from "react";
import {fetchData} from "../../store/model/services/fetchData";
import {useAppDispatch} from "../../store/store";
import cls from './Form.module.scss'
import SearchIcon from '../../assets/icons/search.svg'
import ClearIcon from '../../assets/icons/clear.svg'
import {useSelector} from "react-redux";
import {getUrl} from "../../store/model/selectors/getData";
import {searchActions} from "../../store/model/slices/searchSlice";

const Form = () => {
    const dispatch = useAppDispatch()

    const url = useSelector(getUrl)

    const inputRef = useRef<HTMLInputElement>(null)

    const onChangeSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(searchActions.setUrl(e.target.value))
    }, [dispatch])

    const clearInput = useCallback(() => {
        dispatch(searchActions.setUrl(''))
        inputRef.current && inputRef.current.focus()
    }, [dispatch])

    const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            dispatch(fetchData(url))
        }
    }, [dispatch, url])

    const searchHandle = useCallback(() => {
        dispatch(fetchData(url))
    }, [dispatch, url])

    return (
        <div className={cls.form}>
            <div className={cls.wrapperInput}>
                <img alt="#" className={cls.searchIcon} src={SearchIcon}/>
                <input
                    className={cls.input}
                    type="text"
                    ref={inputRef}
                    placeholder='Phones, apples, oranges...'
                    value={url}
                    onChange={onChangeSearch}
                    onKeyPress={handleKeyPress}
                />
                {url && <img alt="#" className={cls.clearIcon} onClick={clearInput} src={ClearIcon}/>}
            </div>
            <button className={cls.btn} onClick={searchHandle}>Search</button>
        </div>
    )
}

export default memo(Form)