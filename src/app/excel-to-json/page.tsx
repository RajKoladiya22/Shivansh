'use client'

import React, { useRef, useState } from 'react'
import * as XLSX from 'xlsx'

type ProductRaw = { [k: string]: any }
type SpecRow = { productId?: number | string; specKey?: string; specValue?: string; [k: string]: any }
type ReviewRow = { productId?: number | string; id?: number | string; author?: string; rating?: number; comment?: string; date?: string; verified?: boolean; [k: string]: any }

export default function ExcelToJsonPage() {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<any[]>([])
  const [jsonOutput, setJsonOutput] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const tryParseJSON = (v: any) => {
    if (v == null) return v
    if (typeof v !== 'string') return v
    const s = v.trim()
    if (!s) return null
    try {
      return JSON.parse(s)
    } catch {
      return s
    }
  }

  const parseListCell = (v: any) => {
    if (v == null) return []
    if (Array.isArray(v)) return v
    const parsed = tryParseJSON(v)
    if (Array.isArray(parsed)) return parsed
    if (typeof parsed === 'string') {
      const trimmed = parsed.trim()
      if (!trimmed) return []
      return trimmed.split(',').map(s => s.trim()).filter(Boolean)
    }
    return [parsed]
  }

  // normalize header names: trim, remove special chars, to snake then camelCase
  const toCamel = (s: string) => {
    return s
      .trim()
      .replace(/[^a-zA-Z0-9_ ]+/g, '')
      .replace(/\s+/g, '_')
      .split('_')
      .filter(Boolean)
      .map((part, i) => (i === 0 ? part.toLowerCase() : part[0]!.toUpperCase() + part.slice(1).toLowerCase()))
      .join('')
  }

  const normalizeRowsKeys = (rows: any[]): any[] => {
    return rows.map(r => {
      const out: any = {}
      Object.entries(r).forEach(([k, v]) => {
        if (k == null) return
        const key = toCamel(String(k))
        out[key] = v
      })
      return out
    })
  }

  function normalizeProductsSheet(rows: ProductRaw[]) {
    // rows already normalized to camelCase keys
    return rows.map(r => {
      const product: any = { ...r }

      // some cells might be JSON strings; attempt parse for known list fields
      ;['category', 'industry', 'features', 'benefits', 'tags', 'relatedProductIds'].forEach(field => {
        if (product[field] != null) {
          const parsed = tryParseJSON(product[field])
          if (Array.isArray(parsed)) product[field] = parsed
          else if (typeof parsed === 'string') product[field] = parsed.split(',').map((s: string) => s.trim()).filter(Boolean)
        } else {
          product[field] = []
        }
      })

      // numeric coercions
      if (product.id != null && product.id !== '') product.id = Number(product.id)
      if (product.actualPrice != null && product.actualPrice !== '') product.actualPrice = Number(product.actualPrice)
      if (product.salePrice != null && product.salePrice !== '') product.salePrice = Number(product.salePrice)
      if (product.stepsId != null && product.stepsId !== '') product.stepsId = Number(product.stepsId)

      // booleans
      if (product.isTopProduct != null) product.isTopProduct = String(product.isTopProduct).toLowerCase() === 'true'
      if (product.isLatest != null) product.isLatest = String(product.isLatest).toLowerCase() === 'true'

      // ensure relatedProductIds are numbers
      if (product.relatedProductIds && Array.isArray(product.relatedProductIds)) {
        product.relatedProductIds = product.relatedProductIds.map((v: any) => {
          const parsed = tryParseJSON(v)
          return Number(parsed)
        }).filter((n: any) => !isNaN(n))
      }

      // inline review fields possible: reviewAverageRating, reviewReviewCount
      if (product.reviewAverageRating != null || product.reviewReviewCount != null) {
        product.review = {
          averageRating: product.reviewAverageRating != null ? Number(product.reviewAverageRating) : undefined,
          reviewCount: product.reviewReviewCount != null ? Number(product.reviewReviewCount) : undefined,
          latestReviews: [],
          allReviews: []
        }
        delete product.reviewAverageRating
        delete product.reviewReviewCount
      }

      return product
    })
  }

  function groupSpecs(specs: SpecRow[]) {
    const byId: Record<string, any[]> = {}
    specs.forEach(s => {
      // support both productId and product_id variants; keys are camelCased so productId expected
      const id = String((s as any).productId ?? (s as any).product_id ?? '')
      if (!id) return
      byId[id] = byId[id] || []
      // accept specKey/spec_key/spec_name etc
      const key = (s as any).specKey ?? (s as any).spec_key ?? (s as any).key ?? ''
      const value = (s as any).specValue ?? (s as any).spec_value ?? (s as any).value ?? ''
      byId[id].push({ key, value })
    })
    return byId
  }

  function groupReviews(rows: ReviewRow[]) {
    const byId: Record<string, ReviewRow[]> = {}
    rows.forEach(r => {
      const id = String((r as any).productId ?? (r as any).product_id ?? '')
      if (!id) return
      byId[id] = byId[id] || []
      const copy: any = { ...r }
      if (copy.rating != null) copy.rating = Number(copy.rating)
      if (copy.id != null && copy.id !== '') copy.id = Number(copy.id)
      if (typeof copy.verified === 'string') copy.verified = String(copy.verified).toLowerCase() === 'true'
      byId[id].push(copy)
    })
    return byId
  }

  const readSheet = (workbook: XLSX.WorkBook, want: string) => {
    // tolerant sheet name match: remove non-alnum and lowercase
    const normalizeName = (s: string) => s.replace(/[^a-z0-9]/gi, '').toLowerCase()
    const wantNorm = normalizeName(want)
    const idx = workbook.SheetNames.findIndex(sn => normalizeName(sn) === wantNorm)
    if (idx === -1) return []
    const sheetName = workbook.SheetNames[idx]
    if (!sheetName) return []
    const sheet = workbook.Sheets[sheetName]
    if (!sheet) return []
    const raw = XLSX.utils.sheet_to_json(sheet, { defval: null }) as any[]
    return normalizeRowsKeys(raw)
  }

  const handleFile = async (file?: File) => {
    setError(null)
    if (!file) return
    setLoading(true)
    try {
      const ab = await file.arrayBuffer()
      const workbook = XLSX.read(ab, { type: 'array' })

      // attempt to read sheets with tolerant names
      const productsRaw = readSheet(workbook, 'products')
      const specsRaw = readSheet(workbook, 'specs')
      const latestRaw = readSheet(workbook, 'latestReviews')
      const allRaw = readSheet(workbook, 'allReviews')

      // fallback: if only one sheet, treat as products
      const products = normalizeProductsSheet(
        productsRaw.length
          ? productsRaw
          : (workbook.SheetNames.length && workbook.SheetNames[0] && workbook.Sheets[workbook.SheetNames[0] as string]
              ? normalizeRowsKeys(
                  XLSX.utils.sheet_to_json(
                    workbook.Sheets[workbook.SheetNames[0] as string] as XLSX.WorkSheet,
                    { defval: null }
                  )
                )
              : [])
      )

      const specsById = groupSpecs(specsRaw as SpecRow[])
      const latestById = groupReviews(latestRaw as ReviewRow[])
      const allById = groupReviews(allRaw as ReviewRow[])

      const final = products.map(p => {
        const id = String(p.id)
        p.specs = specsById[id] || []
        p.review = p.review || { averageRating: undefined, reviewCount: undefined, latestReviews: [], allReviews: [] }
        p.review.latestReviews = latestById[id] || []
        p.review.allReviews = allById[id] || []
        // compute avg if missing
        if ((p.review.averageRating == null || isNaN(p.review.averageRating)) && p.review.allReviews && p.review.allReviews.length) {
          const avg = p.review.allReviews.reduce((s: number, r: any) => s + (Number(r.rating) || 0), 0) / p.review.allReviews.length
          p.review.averageRating = Number(avg.toFixed(2))
        }
        if ((p.review.reviewCount == null || isNaN(p.review.reviewCount)) && p.review.allReviews) {
          p.review.reviewCount = p.review.allReviews.length
        }
        return p
      })

      setPreview(final.slice(0, 10))
      const jsonStr = JSON.stringify(final, null, 2)
      setJsonOutput(jsonStr)
    } catch (e: any) {
      console.error(e)
      setError(String(e?.message ?? e))
    } finally {
      setLoading(false)
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    handleFile(f)
  }

  const openFilePicker = () => fileRef.current?.click()

  const downloadJson = () => {
    if (!jsonOutput) return
    const blob = new Blob([jsonOutput], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'products.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Excel → JSON converter</h1>
        <p className="text-sm text-gray-600 mb-6">Drop or choose a .xlsx/.xls file. Expected sheets: <code>products</code>, <code>specs</code>, <code>latestReviews</code>, <code>allReviews</code>. If missing we do a best-effort parse.</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <label className="flex-1">
            <input ref={fileRef} id="file-input" type="file" accept=".xlsx,.xls" onChange={onFileChange} className="sr-only" />
            <div onClick={openFilePicker} className="w-full cursor-pointer border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300">
              <span className="block text-sm text-gray-700">Choose Excel file</span>
              <small className="text-xs text-gray-400">Supports comma-separated list cells or JSON arrays inside cells.</small>
            </div>
          </label>

          <button onClick={openFilePicker} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Browse</button>

          <button onClick={() => { setJsonOutput(''); setPreview([]); setError(null) }} className="px-4 py-2 border rounded-lg">Clear</button>
        </div>

        {loading && <div className="text-sm text-gray-500 mb-4">Parsing file...</div>}
        {error && <div className="text-sm text-red-600 mb-4">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="p-4 border rounded-lg">
            <h2 className="font-medium mb-2">Preview (first 10 products)</h2>
            <div className="space-y-3 max-h-64 overflow-auto">
              {preview.length === 0 && <div className="text-sm text-gray-500">No preview available.</div>}
              {preview.map(p => (
                <div key={p.id ?? Math.random()} className="p-2 border rounded">
                  <div className="font-semibold">{p.title || `#${p.id}`}</div>
                  <div className="text-xs text-gray-600">{p.description}</div>
                  <div className="text-xs mt-1 text-gray-700">Price: {p.salePrice ?? p.actualPrice}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="p-4 border rounded-lg">
            <h2 className="font-medium mb-2">Output</h2>
            <div className="flex gap-2 mb-3">
              <button className="px-3 py-1 border rounded" onClick={() => navigator.clipboard.writeText(jsonOutput)}>Copy JSON</button>
              <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={downloadJson} disabled={!jsonOutput}>Download JSON</button>
            </div>
            <textarea readOnly value={jsonOutput} className="w-full h-64 p-2 text-xs font-mono bg-gray-50 border rounded" />
          </section>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <div>Notes:</div>
          <ul className="list-disc ml-5">
            <li>If your Excel lists are stored as comma separated strings this tool will split them into arrays.</li>
            <li>If your sheet names differ, rename them or this tool will attempt tolerant matching.</li>
            <li>Large files can be processed server-side. Ask if you want a server API route instead.</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
