'use client';
import React, { useState } from 'react';

export default function ProductForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    salePrice: '',
    image: '',
    category: ''
  });
  const [status, setStatus] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // DEV ONLY: expose a public token if needed. In prod use real auth.
        'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? ''
      },
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        salePrice: Number(form.salePrice || 0),
        image: form.image,
        category: form.category
      })
    });

    if (res.ok) {
      setStatus('saved');
      setForm({ title: '', description: '', salePrice: '', image: '', category: '' });
    } else {
      const j = await res.json().catch(() => ({ error: 'unknown' }));
      setStatus('error: ' + (j.error || res.status));
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 640 }}>
      <input name="title" value={form.title} onChange={onChange} placeholder="Title" required />
      <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" />
      <input name="salePrice" value={form.salePrice} onChange={onChange} placeholder="Sale price" />
      <input name="image" value={form.image} onChange={onChange} placeholder="Image URL" />
      <input name="category" value={form.category} onChange={onChange} placeholder="Category" />
      <button type="submit">Create</button>
      <div>{status}</div>
    </form>
  );
}
