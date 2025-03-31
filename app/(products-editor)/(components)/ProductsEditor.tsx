"use client";

import { observer } from "mobx-react-lite";
import ProductsEditorForm from "./ProductsEditorForm";
import { useStore } from "@/app/(store)/StoreProvider";
import ProductsEditorTable from "./ProductsEditorTable";
import { useEffect } from "react";

export default observer(function ProductsEditor() {
    const { productsEditorStore } = useStore();

    useEffect(() => {
        productsEditorStore.loadProductsFromStorage();
    }, [productsEditorStore])

    return <div className="space-y-4">
        <p className="text-secondary-foreground leading-6">
            Enter the products available in your supermarket. This list will help the AI suggest a weekly menu and generate a shopping list based on what&apos;s in stock.
        </p>
        <ProductsEditorForm onSubmit={productsEditorStore.addProduct} />
        <ProductsEditorTable products={Array.from(productsEditorStore.products)} onDelete={productsEditorStore.deleteProduct} />
    </div>
})