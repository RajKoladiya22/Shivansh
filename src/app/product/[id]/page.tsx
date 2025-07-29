import { TheProductDetailPage } from "src/_components/sections/Product/ProductDetail";


interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  
  return (
    <>
      <TheProductDetailPage params={resolvedParams}/>
    </>
  );
}



