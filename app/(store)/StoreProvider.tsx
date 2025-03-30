"use client"
import { createContext, ReactNode, useContext } from 'react';
import rootStore from './rootStore';

const StoreContext = createContext(rootStore);

export type StoreProvider = {
    children: ReactNode;
}

export default function StoreProvider(props: StoreProvider) {
    return (
        <StoreContext.Provider value={rootStore}>
            {props.children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
