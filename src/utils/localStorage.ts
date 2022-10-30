import { LOCALSTORAGE } from "../constants/localStorage";

export const setStorageValue = (key: LOCALSTORAGE, value: any)=>{
    localStorage.setItem(key, JSON.stringify(value));
}

export const getStorageValue = (key: LOCALSTORAGE, defaultValue: string)=>{
  return JSON.parse(localStorage.getItem(key) || defaultValue);
}