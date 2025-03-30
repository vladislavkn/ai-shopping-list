"use client"
import { createContext, ReactNode, useContext } from 'react';
import { productEditorStore } from './(products-editor)';

const contextValue = {
    productEditorStore,
}

const StoreContext = createContext(contextValue);

export type StoreProvider = {
    children: ReactNode;
}

export default function StoreProvider(props: StoreProvider) {
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export const useStore = () => useContext(StoreContext);
