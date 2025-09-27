// import fs from 'fs/promises';
// import path from 'path';
// import type { Product } from 'src/_components/sections/types/product.type';


// export default async function Page() {
//     const filePath = path.join(process.cwd(), '/public/data', '/Product/products.json');
  
//   const raw = await fs.readFile(filePath, 'utf8');
//   const products: Product[] = JSON.parse(raw || '[]');
//   console.log("products------>>", products);
  
//   return (
//     <div>
//       {products.map(p => (
//         <div key={p.id}>
//           <h3>{p.title}</h3>
//           <p>{p.description}</p>
//           <p>₹{p.salePrice}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
