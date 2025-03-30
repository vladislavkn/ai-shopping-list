"use client";

import { observer } from "mobx-react-lite";
import ProductsEditorForm from "./ProductsEditorForm";
import { useStore } from "@/app/StoreProvider";

export default observer(function ProductsEditor() {
    const { productEditorStore } = useStore();
    return <div className="space-y-4">
        <p className="text-secondary-foreground leading-6">
            Enter the products available in your supermarket. This list will help the AI suggest a weekly menu and generate a shopping list based on what's in stock.
        </p>
        <ProductsEditorForm onSubmit={productEditorStore.addProduct} />
        {Array.from(productEditorStore.products).join(", ")}
    </div>
})