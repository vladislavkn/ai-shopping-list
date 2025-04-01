import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useState } from "react";

interface ProductsEditorTableProps {
    products: string[];
    onDelete: (product: string) => void;
    onDeleteAll: () => void
}

const ProductsEditorTable = (props: ProductsEditorTableProps) => {
    const { products, onDelete, onDeleteAll } = props;
    const [showAll, setShowAll] = useState(false);

    if (products.length === 0) {
        return <p className="text-muted-foreground text-center md:text-left">No products added yet.</p>;
    }

    const displayProducts = showAll ? products : products.slice(0, 8);
    const hasMoreProducts = products.length > 8;

    return (
        <div className="space-y-2">
            <Table className="border border-sidebar-border">
                <TableHeader>
                    <TableRow className="border-b-sidebar-border">
                        <TableHead className="font-bold">Product Name</TableHead>
                        <TableHead className="w-24 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {displayProducts.map((product) => (
                        <TableRow className="border-b-sidebar-border" key={product}>
                            <TableCell>{product}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(product)}
                                    aria-label={`Delete ${product}`}
                                >
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex justify-end gap-2">
                {products.length > 3 && (
                    <Button onClick={onDeleteAll} variant="destructive" size="sm">
                        <Trash2 /> Clear all
                    </Button>
                )}
                {hasMoreProducts && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-1"
                    >
                        {showAll ? (
                            <>
                                <ChevronUp className="h-4 w-4" />
                                Show less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="h-4 w-4" />
                                Show more ({products.length - 8} more)
                            </>
                        )}
                    </Button>

                )}
            </div>
        </div>
    );
};

export default ProductsEditorTable;
