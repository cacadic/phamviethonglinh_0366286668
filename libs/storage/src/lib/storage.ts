import { SafeAny } from "@sotatek/models";


export enum StorageKeys {
  TODOLIST = 'todolist',
}

export const storageRemove = (key: StorageKeys) => {
  localStorage.removeItem(key);
};

export const storageClear = () => {
  localStorage.clear();
};

export const localStorageGet = <T = SafeAny>(key: StorageKeys): T => {
  return JSON.parse(localStorage.getItem(key) || '{}');
};

export const localStorageSet = (key: StorageKeys, value: SafeAny) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const sessionStorageGet = <T extends object>(key: StorageKeys): T => {
  return JSON.parse(sessionStorage.getItem(key) || '{}');
}

export const sessionStorageSet = (key: StorageKeys, value: SafeAny) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};