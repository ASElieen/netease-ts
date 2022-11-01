// import {useState,useEffect} from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState,AppDispatch } from "../store/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useDebounce = <V>(value:V,delay:number)=>{
//     const [debounce,setDebounce] = useState(value)
//     useEffect(()=>{
//         const timeout = setTimeout(()=>{
//             setDebounce(value)
//         },delay)
//         return ()=>clearTimeout(timeout)
//     },[value,delay])
//     return debounce
// }

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
