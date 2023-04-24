import React, {MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState} from 'react';
import cls from './Modal.module.scss'
import {classNames} from "../../helpers/classNames/classNames";
import CloseIcon from "../../assets/icons/Close.svg";

interface ModalProps {
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

const ANIMATION_DELAY = 300

const Modal = (props: ModalProps) => {

    const {onClose, isOpen, children} = props
    const [isClosing, setIsClosing] = useState(false)

    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

    const closingHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose])

    const onContentClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
    }, [])

    useEffect(() => {
        return () => clearTimeout(timerRef.current)
    }, [])

    const mods: Record<string, boolean | undefined> = {
        [cls.opened]: isOpen,
        [cls.closing]: isClosing
    }

    return (
        <div className={classNames(cls.Modal, mods, [])}>
            <div
                className={cls.overlay}
                onClick={closingHandler}
            >
                <span className={cls.spanClose}>
                    <img alt="#" className={cls.clearIcon} onClick={closingHandler} src={CloseIcon}/>
                </span>
                <div
                    className={cls.content}
                    onClick={onContentClick}
                >
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;