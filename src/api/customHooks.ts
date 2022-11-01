import {useState,useEffect} from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState,AppDispatch } from "../store/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useDebounce = (value:any,delay:number)=>{
    const [debounce,setDebounce] = useState(value)
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setDebounce(value)
        },delay)
        return ()=>clearTimeout(timeout)
    },[value,delay])
    return debounce
}