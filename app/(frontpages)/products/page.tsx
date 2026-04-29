// app/shop/page.tsx  (Server Component)

import { storeData } from "@/dummy_data/store"; // swap for real fetch later
import ProductsPage from "./ProductPage";
import { Suspense } from "react";


export default async function Page() {
  // Replace with: const products = await fetch("/api/products").then(r => r.json())
  const products = storeData;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage products={products} />;
    </Suspense>
  )
}