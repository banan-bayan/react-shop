import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// import { useEffect, useState } from 'react'


// function useLocaleStorage(initialValue, key: string) {
//   const getValue = () => {
//     const storage = localStorage.getItem(key)
//     if (storage) {
//       return JSON.parse(storage)
//     }
//     return initialValue;
//   }

//   const [value, setValue] = useState(getValue);
//   useEffect(() => {
//      localStorage.setItem(key, JSON.stringify(value))
//   }, [value])

//   return [value, setValue]
// }

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
