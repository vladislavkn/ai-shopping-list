import { MealsPlanner } from "./(meals-planner)";
import { ProductsEditor } from "./(products-editor)";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <ProductsEditor />
      <MealsPlanner />
    </div>
  );
}
