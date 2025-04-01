"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { FormEvent, useEffect, useId, useRef, useState } from "react";

export type ProductsEditorFormProps = {
    onSubmit(productDescription: string): boolean
    productSuggestions?: string[]
}

export default function ProductsEditorForm(props: ProductsEditorFormProps) {
    const [randomProduct, setRandomProduct] = useState<string>()
    const setRandomProductIfSuggestionsLoaded = () => {
        if (props.productSuggestions) {
            setRandomProduct(getRandomExampleProduct(props.productSuggestions));
        }
    }

    useEffect(() => {
        setRandomProductIfSuggestionsLoaded();
    }, [props.productSuggestions])

    const productDescriptionRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const productDescriptionElement = form.elements.namedItem('productDescription') as HTMLTextAreaElement;
        if (productDescriptionElement && productDescriptionElement.value.trim()) {
            const isAdded = props.onSubmit(productDescriptionElement.value);
            if (isAdded) {
                form.reset();
                setRandomProductIfSuggestionsLoaded();
            }
            productDescriptionRef.current?.focus();
        }
    }

    const datalistId = useId();

    return <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <Input ref={productDescriptionRef} list={datalistId} name="productDescription" required placeholder={randomProduct} />
        {props.productSuggestions && (
            <datalist id={datalistId}>
                {props.productSuggestions.map((productSuggestion) => (
                    <option value={productSuggestion} key={productSuggestion} />
                ))}
            </datalist>
        )}
        <Button variant="secondary" size="default"><Plus /> Add</Button>
    </form>
}

function getRandomExampleProduct(productSuggestions: string[]): string {
    const randomIndex = Math.floor(Math.random() * productSuggestions.length);
    return productSuggestions[randomIndex];
}
