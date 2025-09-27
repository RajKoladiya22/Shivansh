// File: src/features/ProductFeature.tsx
// Drop this file into src/features/ProductFeature.tsx and import the components where needed.

'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// ---------------------- Types ----------------------
export type Review = { id: number; author: string; rating: number; comment: string; date: string; verified: boolean };
export type Product = {
  id: number;
  title: string;
  description?: string;
  actualPrice?: number;
  salePrice?: number;
  image?: string;
  category?: string;
  createdAt?: string;
  tags?: string[];
  review?: { averageRating?: number; reviewCount?: number; latestReviews?: Review[] };
};

// ---------------------- Constants ----------------------
const STORAGE_KEY = 'shivansh_products_v1';
const AUTH_KEY = 'shivansh_user_v1';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'TallyPrime Silver',
    description:
      'Single user Edition For Single PC, GST Billing Inventory Management & Any Many More Facility Available in Tally',
    actualPrice: 25000,
    salePrice: 22500,
    image:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    category: 'Manufacturers',
    createdAt: '2024-01-15',
    tags: ['camera', '4K', 'professional', 'DSLR'],
    review: { averageRating: 4.8, reviewCount: 132 },
  },
];

// ---------------------- Auth (client-side, localStorage) ----------------------
type User = { username: string } | null;
const AuthContext = createContext<{
  user: User;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}>({ user: null, login: async () => false, logout: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    else localStorage.removeItem(AUTH_KEY);
  }, [user]);

  const login = async (username: string, password: string) => {
    // Minimal demo auth. Replace with real API call if needed.
    if (!username || !password) return false;
    // simple rule: password === "password" for demo
    if (password === 'password') {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

// ---------------------- Product Provider (persist to localStorage) ----------------------
const ProductContext = createContext<{
  products: Product[];
  add: (p: Omit<Product, 'id' | 'createdAt'>) => Product;
  update: (id: number, patch: Partial<Product>) => Product | null;
  remove: (id: number) => void;
}>({ products: [], add: () => ({} as Product), update: () => null, remove: () => {} });

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Product[];
    } catch {}
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {}
  }, [products]);

  const add = (p: Omit<Product, 'id' | 'createdAt'>) => {
    const next: Product = {
      ...p,
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10),
    } as Product;
    setProducts(s => [next, ...s]);
    return next;
  };

  const update = (id: number, patch: Partial<Product>) => {
    let updated: Product | null = null;
    setProducts(s =>
      s.map(it => {
        if (it.id !== id) return it;
        updated = { ...it, ...patch };
        return updated;
      }),
    );
    return updated;
  };

  const remove = (id: number) => setProducts(s => s.filter(p => p.id !== id));

  const value = useMemo(() => ({ products, add, update, remove }), [products]);
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  return useContext(ProductContext);
}

// ---------------------- Minimal UI Components ----------------------
export function LoginForm() {
  const { login } = useAuth();
  const [u, setU] = useState('admin');
  const [p, setP] = useState('password');
  const [err, setErr] = useState<string | null>(null);

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        const ok = await login(u, p);
        if (!ok) setErr('invalid credentials');
      }}
      style={{ display: 'grid', gap: 8, width: 320 }}
    >
      <input value={u} onChange={e => setU(e.target.value)} placeholder="username" />
      <input value={p} onChange={e => setP(e.target.value)} placeholder="password" type="password" />
      <button type="submit">Login</button>
      {err && <div style={{ color: 'crimson' }}>{err}</div>}
    </form>
  );
}

export function ProductForm() {
  const { add } = useProducts();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (!title) return alert('title required');
        const p = add({ title, description, salePrice: Number(price) || undefined, category, image: img });
        setTitle('');
        setDescription('');
        setPrice('');
        setCategory('');
        setImg('');
        // focus or notify
      }}
      style={{ display: 'grid', gap: 8, width: 480 }}
    >
      <input placeholder="Product title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Short description" value={description} onChange={e => setDescription(e.target.value)} />
      <input placeholder="Sale price" value={price} onChange={e => setPrice(e.target.value)} type="number" />
      <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <input placeholder="Image URL" value={img} onChange={e => setImg(e.target.value)} />
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit">Add product</button>
      </div>
    </form>
  );
}

export function ProductListView() {
  const { products, remove } = useProducts();
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {products.map(p => (
        <div key={p.id} style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8, display: 'flex', gap: 12 }}>
          <img src={p.image} alt={p.title} style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{p.title}</div>
            <div style={{ fontSize: 13 }}>{p.description}</div>
            <div style={{ marginTop: 8 }}>
              <small>Price: {p.salePrice ?? p.actualPrice ?? '—'}</small>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button onClick={() => navigator.clipboard.writeText(JSON.stringify(p))}>Copy</button>
            <button onClick={() => remove(p.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------- Page wrapper example ----------------------
export function ProductPageExample() {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding: 100 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Products</h2>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: 8 }}>{user.username}</span>
              <button onClick={() => logout()}>Logout</button>
            </>
          ) : (
            <em>not signed in</em>
          )}
        </div>
      </header>

      {!user ? (
        <div style={{ marginTop: 12 }}>
          <strong>Sign in to add products</strong>
          <LoginForm />
        </div>
      ) : (
        <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
          <ProductForm />
          <ProductListView />
        </div>
      )}
    </div>
  );
}

// ---------------------- How to use
/*
1. Add this file to src/features/ProductFeature.tsx
2. In a page (for example app/product/page.tsx) import and use:

import React from 'react';
import { AuthProvider, ProductProvider, ProductPageExample } from 'src/features/ProductFeature';

export default function Page() {
  return (
    <AuthProvider>
      <ProductProvider>
        <ProductPageExample />
      </ProductProvider>
    </AuthProvider>
  );
}

3. Optional: server-side API sample below. Note: server cannot read client localStorage. The API shows how to expose a server source of truth.
*/

// ---------------------- Example server API route (app router)
// File: app/api/products/route.ts

/*
import { NextResponse } from 'next/server';
import { INITIAL_PRODUCTS } from 'src/features/ProductFeature'; // or a shared data file

export async function GET() {
  return NextResponse.json(INITIAL_PRODUCTS);
}

export async function POST(request: Request) {
  const payload = await request.json();
  // For demo: validate and echo back. To persist use a DB.
  return NextResponse.json({ ok: true, created: payload }, { status: 201 });
}
*/

// ---------------------- Notes and next steps
/*
- This is a minimal, client-side-first implementation. It persists the product list to localStorage under key: "shivansh_products_v1".
- Auth is demo-only. Replace login logic with your auth provider (NextAuth, Clerk, or your API).
- To sync client products with a server, POST new products to app/api/products and maintain a server DB. Use background sync or pull-to-refresh.
- For production consider: input validation, XSS protection for user-entered HTML, file upload for images, and proper authentication.
*/
