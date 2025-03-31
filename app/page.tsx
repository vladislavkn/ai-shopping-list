import { MealsPlanner } from "./(meals-planner)";
import { ProductsEditor } from "./(products-editor)";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-16 md:flex-row">
      <div className="md:flex-1/2"><ProductsEditor /></div>
      <div className="md:flex-1/2"><MealsPlanner /></div>
    </div>
  );
}
