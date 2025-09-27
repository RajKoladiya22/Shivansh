# Shivansh
├──src
|   ├── app
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css
│   │   │
│   │   ├─ page.tsx             ← Home page
│   │   │
│   │   ├─ about
│   │   │   └─ page.tsx         ← /about
│   │   ├─ api
│   │   │   └─ og               ← /OG
│   │   │       └── route.tsx   ← /OG image
│   │   │
│   │   ├─ team
│   │   │   └─ page.tsx         ← /team
│   │   │
│   │   ├─ product
│   │   │   └─ page.tsx         ← /product
│   │   │   └─ [id]             ← /product details by id
│   │   │       └─ page.tsx         ← /product details
│   │   │
│   │   ├─ blog
│   │   │   └─ page.tsx         ← /blog
│   │   │   └─ [id]             ← /blog details by id
│   │   │       └─ page.tsx         ← /blog details
│   │   │
│   │   └─ contact
│   │        └─ page.tsx        ← /contact
│   │
|   ├── components
│   │   ├── index.ts                # ← exports from ui/, molecules/, sections/
│   │   │
│   │   ├── ui
│   │   │   ├── index.ts            # ← export { Button } from './Button'; etc.
│   │   │   ├── Button.tsx
│   │   │   ├── Heading.tsx
│   │   │   └── Input.tsx
│   │   │
│   │   ├── molecules
│   │   │   ├── index.ts            # ← export { LogoBar } from './LogoBar'; etc.
│   │   │   ├── LogoBar.tsx
│   │   │   ├── StatItem.tsx
│   │   │   └── IndustryCard.tsx
│   │   │
│   │   └── sections
│   │       ├── index.ts            # ← export { Hero } from './Hero'; etc.
│   │       ├── Hero.tsx
│   │       ├── TrustedBy.tsx
│   │       ├── AboutStats.tsx
│   │       ├── WhyUs.tsx
│   │       ├── Founder.tsx
│   │       ├── VisionMission.tsx
│   │       ├── Testimonials.tsx
│   │       ├── UseCases.tsx
│   │       └── ContactForm.tsx
│   │
|   ├── lib
│   │   ├── index.ts                # ← export * from './api'; export hooks
│   │   ├── api.ts                  # generic fetch wrapper
│   │   ├── useContact.ts
│   │   └── useTestimonials.ts
│   │
|   ├── styles
│   │   ├── tailwind.config.js
│   │   └── design-tokens.css       # custom CSS vars, if any
│   │
├── public
│       ├── images
│       │   ├── hero.jpg
│       │   ├── logo-zipper.svg
│       │   ├── avatar-mehul.png
│       │   └── …others
│       └── data
│           ├── product.tsx          # store list of products in array
│           ├── blog.tsx             # store list of blog in array
│           └── …others  
├── env.ts                           # t3-env schema
├── next.config.js
├── tsconfig.json
└── package.json

   
