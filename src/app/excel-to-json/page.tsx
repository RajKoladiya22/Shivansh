// README
// Install dependencies:
// npm install xlsx
// (Tailwind should already be configured in your Next.js project)

// File: app/(tools)/excel-to-json/page.tsx
// Next.js App Router page (TSX). Drop into app route or adapt to pages/index.tsx

// 'use client'

// import React, { useState } from 'react'
// import * as XLSX from 'xlsx'

// type ProductSheetRow = { [k: string]: any }

// type SpecRow = { product_id: number | string; spec_key: string; spec_value: string }
// type ReviewRow = { product_id: number | string; id?: number | string; author?: string; rating?: number; comment?: string; date?: string; verified?: boolean }

// export default function ExcelToJsonPage() {
//   const [preview, setPreview] = useState<any[]>([])
//   const [jsonOutput, setJsonOutput] = useState<string>('')
//   const [error, setError] = useState<string | null>(null)
//   const [loading, setLoading] = useState(false)

//   const parseListCell = (v: any) => {
//     if (v == null) return []
//     if (Array.isArray(v)) return v
//     if (typeof v === 'string') {
//       const trimmed = v.trim()
//       if (!trimmed) return []
//       // try JSON parse
//       try {
//         const parsed = JSON.parse(trimmed)
//         if (Array.isArray(parsed)) return parsed
//       } catch (e) {
//         // not JSON
//       }
//       return trimmed.split(',').map(s => s.trim()).filter(Boolean)
//     }
//     return [v]
//   }

//   function normalizeProductsSheet(rows: ProductSheetRow[]) {
//     // Expect columns like id,title,description,actualPrice,salePrice,image,introVideoId,detailedVideoId,
//     // category,industry,isTopProduct,isLatest,createdAt,features,benefits,tags,stepsID,review_averageRating,review_reviewCount
//     // If some columns contain JSON strings we attempt to parse them.
//     return rows.map(r => {
//       const product: any = { ...r }
//       // convert numeric fields
//       if (product.id != null) product.id = Number(product.id)
//       if (product.actualPrice != null) product.actualPrice = Number(product.actualPrice)
//       if (product.salePrice != null) product.salePrice = Number(product.salePrice)
//       if (product.stepsID != null) product.stepsID = Number(product.stepsID)

//       // boolean fields
//       if (product.isTopProduct != null) product.isTopProduct = String(product.isTopProduct).toLowerCase() === 'true'
//       if (product.isLatest != null) product.isLatest = String(product.isLatest).toLowerCase() === 'true'

//       // lists
//       product.category = parseListCell(product.category)
//       product.industry = parseListCell(product.industry)
//       product.features = parseListCell(product.features)
//       product.benefits = parseListCell(product.benefits)
//       product.tags = parseListCell(product.tags)
//       // relatedProductIds convert to numbers
//       product.relatedProductIds = parseListCell(product.relatedProductIds).map((v: any) => Number(v))

//       // inline review basic fields
//       if (product.review_averageRating != null || product.review_reviewCount != null) {
//         product.review = {
//           averageRating: product.review_averageRating != null ? Number(product.review_averageRating) : undefined,
//           reviewCount: product.review_reviewCount != null ? Number(product.review_reviewCount) : undefined,
//           latestReviews: [],
//           allReviews: []
//         }
//         delete product.review_averageRating
//         delete product.review_reviewCount
//       }

//       return product
//     })
//   }

//   function groupSpecs(specs: SpecRow[]) {
//     const byId: Record<string, any[]> = {}
//     specs.forEach(s => {
//       const id = String(s.product_id)
//       byId[id] = byId[id] || []
//       byId[id].push({ key: s.spec_key, value: s.spec_value })
//     })
//     return byId
//   }

//   function groupReviews(rows: ReviewRow[]) {
//     const byId: Record<string, ReviewRow[]> = {}
//     rows.forEach(r => {
//       const id = String(r.product_id)
//       byId[id] = byId[id] || []
//       const copy = { ...r }
//       if (copy.rating != null) copy.rating = Number(copy.rating)
//       if (copy.id != null) copy.id = Number(copy.id)
//       if (typeof copy.verified === 'string') copy.verified = String(copy.verified).toLowerCase() === 'true'
//       byId[id].push(copy)
//     })
//     return byId
//   }

//   const handleFile = async (file?: File) => {
//     setError(null)
//     if (!file) return
//     setLoading(true)
//     try {
//       const ab = await file.arrayBuffer()
//       const workbook = XLSX.read(ab, { type: 'array' })

//       // lower-case sheet name mapping helper
//       const sheetNames = workbook.SheetNames.map(s => s.toLowerCase())

//       const readSheet = (name: string) => {
//         const idx = sheetNames.indexOf(name.toLowerCase())
//         if (idx === -1) return []
//         const sheetName = workbook.SheetNames[idx]
//         if (!sheetName) return []
//         const sheet = workbook.Sheets[sheetName]
//         if (!sheet) return []
//         const data = XLSX.utils.sheet_to_json(sheet, { defval: null }) as any[]
//         return data
//       }

//       const productsRaw = readSheet('products')
//       const specsRaw = readSheet('specs')
//       const latestRaw = readSheet('latestreviews')
//       const allRaw = readSheet('allreviews')

//       // fallback: if workbook has only one sheet, try to interpret it as products
//       const products = normalizeProductsSheet(
//         productsRaw.length
//           ? productsRaw
//           : (readSheet(workbook.SheetNames[0] ?? '') || [])
//       )
//       const specsById = groupSpecs(specsRaw as SpecRow[])
//       const latestById = groupReviews(latestRaw as ReviewRow[])
//       const allById = groupReviews(allRaw as ReviewRow[])

//       // merge into final structure
//       const final = products.map(p => {
//         const id = String(p.id)
//         // attach specs
//         p.specs = specsById[id] || []
//         // attach review object if missing
//         p.review = p.review || { averageRating: undefined, reviewCount: undefined, latestReviews: [], allReviews: [] }
//         p.review.latestReviews = latestById[id] || []
//         p.review.allReviews = allById[id] || []
//         // if review.avg or count empty try compute from allReviews
//         if ((p.review.averageRating == null || isNaN(p.review.averageRating)) && p.review.allReviews && p.review.allReviews.length) {
//           const avg = p.review.allReviews.reduce((s: number, r: any) => s + (Number(r.rating) || 0), 0) / p.review.allReviews.length
//           p.review.averageRating = Number(avg.toFixed(2))
//         }
//         if ((p.review.reviewCount == null || isNaN(p.review.reviewCount)) && p.review.allReviews) {
//           p.review.reviewCount = p.review.allReviews.length
//         }
//         return p
//       })

//       setPreview(final.slice(0, 10))
//       const jsonStr = JSON.stringify(final, null, 2)
//       setJsonOutput(jsonStr)
//     } catch (e: any) {
//       console.error(e)
//       setError(String(e.message || e))
//     } finally {
//       setLoading(false)
//     }
//   }

//   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0]
//     handleFile(f)
//   }

//   const downloadJson = () => {
//     const blob = new Blob([jsonOutput], { type: 'application/json' })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement('a')
//     a.href = url
//     a.download = 'products.json'
//     a.click()
//     URL.revokeObjectURL(url)
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-12">
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-10">
//         <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Excel → JSON converter</h1>
//         <p className="text-sm text-gray-600 mb-6">Drop or choose a .xlsx/.xls file. Expected sheets: <code>products</code>, <code>specs</code>, <code>latestReviews</code>, <code>allReviews</code>. If missing we do a best-effort parse.</p>

//         <div className="flex flex-col sm:flex-row gap-3 mb-6">
//           <label className="flex-1">
//             <input type="file" accept=".xlsx,.xls" onChange={onFileChange} className="hidden" id="file-input" />
//             <div className="w-full cursor-pointer border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300">
//               <span className="block text-sm text-gray-700">Choose Excel file</span>
//               <small className="text-xs text-gray-400">Supports comma-separated list cells or JSON arrays inside cells.</small>
//             </div>
//           </label>

//           <button onClick={() => { const el = document.getElementById('file-input') as HTMLInputElement; el?.click() }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Browse</button>

//           <button onClick={() => { setJsonOutput(''); setPreview([]); setError(null) }} className="px-4 py-2 border rounded-lg">Clear</button>
//         </div>

//         {loading && <div className="text-sm text-gray-500 mb-4">Parsing file...</div>}
//         {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <section className="p-4 border rounded-lg">
//             <h2 className="font-medium mb-2">Preview (first 10 products)</h2>
//             <div className="space-y-3 max-h-64 overflow-auto">
//               {preview.length === 0 && <div className="text-sm text-gray-500">No preview available.</div>}
//               {preview.map(p => (
//                 <div key={p.id} className="p-2 border rounded">
//                   <div className="font-semibold">{p.title || `#${p.id}`}</div>
//                   <div className="text-xs text-gray-600">{p.description}</div>
//                   <div className="text-xs mt-1 text-gray-700">Price: {p.salePrice ?? p.actualPrice}</div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           <section className="p-4 border rounded-lg">
//             <h2 className="font-medium mb-2">Output</h2>
//             <div className="flex gap-2 mb-3">
//               <button className="px-3 py-1 border rounded" onClick={() => navigator.clipboard.writeText(jsonOutput)}>Copy JSON</button>
//               <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={downloadJson} disabled={!jsonOutput}>Download JSON</button>
//             </div>
//             <textarea readOnly value={jsonOutput} className="w-full h-64 p-2 text-xs font-mono bg-gray-50 border rounded" />
//           </section>
//         </div>

//         <div className="mt-6 text-xs text-gray-500">
//           <div>Notes:</div>
//           <ul className="list-disc ml-5">
//             <li>If your Excel lists are stored as comma separated strings this tool will split them into arrays.</li>
//             <li>If your sheet names differ, rename them or add additional sheet-detection code.</li>
//             <li>Large files can be processed server-side. Ask if you want a server API route instead.</li>
//           </ul>
//         </div>
//       </div>
//     </main>
//   )
// }


export default function ExcelToJsonPage(){
  return (
    // 404 Page
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6 sm:p-8 lg:p-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-600">Page Not Found</p>
      </div>
    </main>
  )
}
