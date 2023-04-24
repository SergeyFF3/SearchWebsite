import './styles/index.scss'
import React, {memo, useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getData, getError, getIsLoading, getNoResult} from "./store/model/selectors/getData";
import Form from './components/Form/Form';
import Modal from "./components/Modal/Modal";
import {fetchNextDataPage} from "./store/model/services/fetchNextDataPage";
import {useAppDispatch} from "./store/store";
import Loader from "./components/Loader/Loader";


const App = () => {
    const dispatch = useAppDispatch()

    // SearchData
    const data = useSelector(getData)
    const error = useSelector(getError)
    const isLoading = useSelector(getIsLoading)
    const noResult = useSelector(getNoResult)

    // Modal parameters
    const [isOpen, setIsOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')

    const openHandler = useCallback((src: string) => {
        setIsOpen(true)
        setSelectedImage(src);
    }, [])

    const closeHandler = useCallback(() => {
        setIsOpen(false)
        setSelectedImage('')
    }, [])

    // infiniteScroll
    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

        if (distanceFromBottom < 100 && data?.length) {
            dispatch(fetchNextDataPage());
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    if (noResult || error) {
        return (
            <div className="app">
                <div className="content">
                    <div className="container">
                        <div className="main">
                            <Form/>
                            {isLoading && <Loader/>}
                            {<p className="noResult">{noResult}</p>}
                            {<p className="noResult">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (data?.length === 0 && isLoading) {
        return (
            <div className="app">
                <div className="content">
                    <div className="container">
                        <div className="main">
                            <Form/>
                            <Loader/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <div className="content">
                <div className="container">
                    {data && data.length > 0
                        ? <div className="main">
                            <Form/>
                            <div className="flex">
                                {data.map(({urls, id}) => (
                                    <img className="imageCard"
                                         alt="#"
                                         key={id}
                                         src={urls?.small}
                                         onClick={() => openHandler(urls?.regular ?? '')}
                                    />
                                ))}
                            </div>
                        </div>

                        : <div className="wrapper">
                            <Form/>
                        </div>}

                    {isLoading && <Loader/>}
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={closeHandler}>
                <img alt="image" className="imageModal" src={selectedImage}/>
            </Modal>
        </div>
    );
}

export default memo(App);