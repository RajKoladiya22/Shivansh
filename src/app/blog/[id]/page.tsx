import TheBlogDetailPage from "src/_components/sections/Blog/BlogDetail";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params;
  
  return (
    <>
      <TheBlogDetailPage params={resolvedParams} />
    </>
  );
}