"use client";

import { observer } from "mobx-react-lite";
import ProductsEditorForm from "./ProductsEditorForm";
import { useStore } from "@/app/StoreProvider";
import ProductsEditorTable from "./ProductsEditorTable";
import { useEffect } from "react";

export default observer(function ProductsEditor() {
    const { productEditorStore } = useStore();

    useEffect(() => {
        productEditorStore.loadProductsFromStorage();
    }, [])

    return <div className="space-y-4">
        <p className="text-secondary-foreground leading-6">
            Enter the products available in your supermarket. This list will help the AI suggest a weekly menu and generate a shopping list based on what's in stock.
        </p>
        <ProductsEditorForm onSubmit={productEditorStore.addProduct} />
        <ProductsEditorTable products={Array.from(productEditorStore.products)} onDelete={productEditorStore.deleteProduct} />
    </div>
})