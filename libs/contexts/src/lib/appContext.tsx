import { SafeAny, ToDo } from '@sotatek/models';
import React, { useEffect, useState } from 'react';

interface AppContextProps {
  listToDo: ToDo[];
  setListToDo: SafeAny;
}

export const AppContext = React.createContext<AppContextProps>({
  listToDo: [],
  setListToDo: null,
});

export const AppContextProvider = (props: SafeAny) => {
  const [listToDo, setListToDo] = useState<ToDo[]>([]);
  return (
    <AppContext.Provider
      value={{
        listToDo,
        setListToDo,
      }}
    >
      {React.Children.toArray(props.children)}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
