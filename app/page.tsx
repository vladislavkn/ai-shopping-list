import { ProductsEditor } from "./(products-editor)";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <ProductsEditor />
      </div>
      <div>Results</div>
    </div>
  );
}
