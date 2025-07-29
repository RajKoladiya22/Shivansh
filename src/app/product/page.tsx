// src/app/team/page.tsx
// import TeamGrid from '~/components/sections/TeamGrid';


import { TheProductPage } from "src/_components/sections/Product";
import { HeroProduct } from "src/_components/sections/Product/productHero";

export default function ProductPage() {
  return (
    <>
      <HeroProduct />
      <TheProductPage />
    </>
  );
}
