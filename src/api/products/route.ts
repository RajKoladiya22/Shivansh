// import { NextResponse } from 'next/server';
// import fs from 'fs/promises';
// import path from 'path';
// import type { Product } from 'src/_components/sections/types/product.type';


// const filePath = path.join(process.cwd(), 'data', 'products.json');

// async function readProducts(): Promise<Product[]> {
//   try {
//     const raw = await fs.readFile(filePath, 'utf8');
//     return JSON.parse(raw);
//   } catch (e) {
//     return [];
//   }
// }

// async function writeProducts(products: Product[]) {
//   await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf8');
// }

// export async function GET() {
//   const products = await readProducts();
//   return NextResponse.json(products);
// }

// export async function POST(req: Request) {
//   // simple API-key auth for dev
//   const apiKeyHeader = req.headers.get('x-api-key');
//   if (apiKeyHeader !== process.env.API_KEY) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const body = await req.json();
//   if (!body?.title) {
//     return NextResponse.json({ error: 'title required' }, { status: 400 });
//   }

//   const products = await readProducts();
//   const nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
//   const newProduct: Product = {
//     id: nextId,
//     title: String(body.title),
//     description: body.description || '',
//     actualPrice: body.actualPrice || 0,
//     salePrice: body.salePrice || 0,
//     image: body.image || '',
//     category: body.category || '',
//     createdAt: new Date().toISOString().slice(0,10),
//     stepsID: body.stepsID || [],
//     introVideoId: body.introVideoId || '',
//     detailedVideoId: body.detailedVideoId || '',
//     industry: body.industry || '',
//     tags: body.tags || [],
//     isActive: body.isActive ?? true,
//     // rating: body.rating || 0,
//     review: body.review || [],
//     // stock: body.stock || 0,
//     // vendor: body.vendor || '',
//     features: body.features || [],
//     isTopProduct: body.isTopProduct ?? false,
//     isLatest: body.isLatest ?? false,
//     benefits: body.benefits || [],
//     relatedProductIds: body.relatedProductIds || []
//   };

//   products.push(newProduct);
//   await writeProducts(products);
//   return NextResponse.json(newProduct, { status: 201 });
// }
