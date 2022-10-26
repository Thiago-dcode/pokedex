import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      if(initialValue) return item ? JSON.parse(item) : initialValue;
      else return  JSON.parse(item)
     
    } catch (error) {
      console.log(error)
    }
  });

  const setValue = (value) => {
    try {
   
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
