export const blogPosts = [
    {
        id: 1,
        title: "GST Compliance Checklist for Small Businesses (2025 Edition)",
        excerpt:
            "A comprehensive checklist to help small businesses stay up-to-date with GST compliance requirements in 2025.",
        content: `This post walks you through:
1. GST registration process,
2. Monthly vs. quarterly return filing,
3. Input tax credit reconciliation,
4. Common errors and how to fix them,
5. Compliance best practices.`,
        category: "GST",
        tags: ["GST 2025", "Small Business", "Compliance", "Tax Filing"],
        author: {
            name: "Neha Patel",
            bio: "Neha Patel is a practicing CMA with expertise in GST implementation for SMEs.",
            image: "https://example.com/images/authors/neha-patel.jpg"
        },
        date: "June 15, 2025",
        likes: 85,
        views: 980,
        isLiked: false,
        relatedPosts: [2, 3],
    },
    {
        id: 2,
        title: "How to Calculate Corporate Tax in India",
        excerpt:
            "Step-by-step guide to calculating corporate income tax, deductions, and compliance for Indian companies.",
        content: `Learn how to:
- Determine taxable income,
- Apply slab rates for domestic and foreign companies,
- Claim deductions (Section 80C, 80IA, etc.),
- File income tax returns accurately.`,
        category: "Tax",
        tags: ["Corporate Tax", "Income Tax", "Indian Tax Laws"],

        author: {
            name: "Rahul Jain",
            bio: "Rahul Jain is a chartered accountant and tax advisor for corporate clients.",
            image: "https://example.com/images/authors/rahul-jain.jpg"
        },
        date: "May 30, 2025",
        likes: 112,
        views: 1430,
        isLiked: false,
        relatedPosts: [1, 5],
    },
    {
        id: 3,
        title: "Introduction to Tally Prime: Key Features & Setup",
        excerpt:
            "An essential beginner’s guide to Tally Prime, explaining installation, configuration, and core features.",
        content: `This guide introduces:
- Tally Prime setup,
- Master creation (ledgers, stock items),
- Voucher entry basics,
- GST integration & returns,
- Inventory tracking and reporting.`,
        category: "Tally",
        tags: ["Tally Prime", "Accounting Software", "ERP", "GST Integration"],
        author: {
            name: "Sumeet Desai",
            bio: "Sumeet Desai is a Tally certified instructor with over 7 years training experience.",
            image: "https://example.com/images/authors/rahul-jain.jpg"
        },
        date: "April 18, 2025",
        likes: 94,
        views: 780,
        isLiked: false,
        relatedPosts: [1, 4],
    },
    {
        id: 4,
        title: "TL‑Development‑Language (TDL) for Customizing Tally Reports",
        excerpt:
            "Learn how to use TDL to customize reports and automate tasks within Tally software.",
        content: `Covers:
- Basics of TDL syntax,
- Creating custom voucher types,
- Designing new reports,
- Automating data validation,
- Integrating GST reports into custom dashboards.`,
        category: "TDL",
        tags: ["TDL", "Tally Customization", "Automation", "Developer"],
        author: {
            name: "Priya Singh",
            bio: "Priya Singh is a TDL developer and consultant specializing in Tally solutions.",
            image: "https://example.com/images/authors/rahul-jain.jpg"
        },
        date: "March 28, 2025",
        likes: 73,
        views: 520,
        isLiked: false,
        relatedPosts: [3, 5],
    },
    {
        id: 5,
        title: "Top 5 Accounting Software Options for Indian SMEs (2025)",
        excerpt:
            "Review and compare the leading accounting software options available for Indian small and medium enterprises in 2025.",
        content: `We evaluate:
- Tally Prime,
- Zoho Books,
- QuickBooks Online,
- Marg ERP,
- Busy Accounting.`,
        category: "Accounting Software",
        tags: ["Software Comparison", "SME Tools", "Cloud Accounting"],
        author: {
            name: "Karan Mehra",
            bio: "Karan Mehra is a business advisor helping SMEs choose the right software stack.",
            image: "https://example.com/images/authors/rahul-jain.jpg"
        },
        date: "February 5, 2025",
        likes: 140,
        views: 1600,
        isLiked: false,
        relatedPosts: [2, 3],
    },
    {
        id: 6,
        title: "Understanding Input Tax Credit (ITC) Mechanisms",
        excerpt:
            "Detailed explainer on eligibility, claiming, and reversal rules for input tax credit under GST.",
        content: `Includes:
- Eligibility conditions,
- Matching purchase invoices,
- Common rejections on GST portal,
- Reversal scenarios and corrections.`,
        category: "GST",
        tags: ["ITC", "Purchase Credit", "GST Portal"],

        author: {
            name: "Anjali Verma",
            bio: "Anjali Verma is a business advisor helping SMEs choose the right software stack.",
            image: "https://example.com/images/authors/rahul-jain.jpg"
        },
        date: "January 22, 2025",
        likes: 65,
        views: 430,
        isLiked: false,
        relatedPosts: [1, 6],
    },
    {
        id: 7,
        title: "Year‑end Accounting Close: Tips & Checklist",
        excerpt:
            "Prepare your books for the fiscal year‑end with a step‑by‑step closing process for Indian businesses.",
        content: `We cover:
- Trial balance finalization,
- Asset depreciation entry,
- GST reconciliation,
- Profit & loss adjustments,
- Preparing balance sheet and financials.`,
        category: "Accounting",
        tags: ["Year End", "Financial Close", "P&L", "Balance Sheet"],
        author: {
            name: "Vivek Rao",
            bio: "Vivek Rao is a business advisor helping SMEs choose the right software stack.",
            image: "https://example.com/images/authors/rahul-jain.jpg"
        },
        date: "December 31, 2024",
        likes: 58,
        views: 520,
        isLiked: false,
        relatedPosts: [5, 6],
    },
    {
        id: 8,
        title: "Reconciling Bank Statements: A Quick Guide",
        excerpt:
            "Best practices and walkthroughs for reconciling your bank statements with your accounting records.",
        content: `Topics:
- Automated import from bank,
- Matching transactions,
- Identifying discrepancies,
- Posting adjustment entries.`,
        category: "Accounting",
        tags: ["Bank Reconciliation", "Accuracy", "Audit Trail"],
        author: {
            name: "Rita Kapoor",
            bio: "Rita Kapoor is a business advisor helping SMEs choose the right software stack.",
            image: "https://example.com/images/authors/rahul-jain.jpg"
        },
        date: "November 10, 2024",
        likes: 47,
        views: 410,
        isLiked: false,
        relatedPosts: [7, 5],
    },
    {
        id: 9,
        title: "Automating GST Returns in Tally Prime",
        excerpt:
            "Learn how to automate generation and filing of GSTR‑1 and GSTR‑3B within Tally.",
        content: `Discusses:
- Configuring GST ledgers,
- Generating return summaries,
- Exporting return data,
- Auto-upload options via APIs or Tally integrations.`,
        category: "Accounting Software",
        tags: ["Tally Prime", "GST Automation", "Efficiency"],

        author: {
            name: "Sumeet Desai",
            bio: "Sumeet Desai is a business advisor helping SMEs choose the right software stack.",
            image: "https://example.com/images/authors/rahul-jain.jpg"
        },
        date: "October 15, 2024",
        likes: 68,
        views: 610,
        isLiked: false,
        relatedPosts: [3, 4],
    },
    {
        id: 10,
        title: "Custom TDL Scripts to Enhance Tally Workflows",
        excerpt:
            "Examples of simple TDL scripts to speed up routine tasks in Tally.",
        content: `Includes code for:
- Auto-printing invoices,
- Custom voucher approval flow,
- Alert pop-ups for missing GST fields,
- Exporting reports to Excel automatically.`,
        category: "TDL",
        tags: ["TDL Scripts", "Productivity", "Code Samples"],
                author: {
            name: "Priya Singh",
            bio: "Priya Singh is a business advisor helping SMEs choose the right software stack.",
            image: "https://example.com/images/authors/rahul-jain.jpg"
        },
        date: "September 5, 2024",
        likes: 32,
        views: 290,
        isLiked: false,
        relatedPosts: [4, 9],
    },
    {
        id: 11,
        title: "Cloud vs On‑Premise Accounting Software in India",
        excerpt:
            "Comparative analysis of cloud‑based vs desktop (on‑premise) accounting software for Indian businesses.",
        content: `We compare:
- Setup and maintenance costs,
- Data security and backups,
- Accessibility & multi‑user support,
- GST updates and compliance integration.`,
        category: "Accounting Software",
        tags: ["Cloud Accounting", "Tally Prime", "Zoho Books", "QuickBooks"],
                        author: {
            name: "Neha Patel",
            bio: "Neha Patel is a business advisor helping SMEs choose the right software stack.",
            image: "https://example.com/images/authors/rahul-jain.jpg"
        },
        date: "August 20, 2024",
        likes: 78,
        views: 650,
        isLiked: false,
        authorBio:
            "Neha Patel advises clients on cloud migration and software compliance.",
        authorImage: "https://example.com/images/authors/neha-patel.jpg",
        relatedPosts: [5, 7],
    },
    {
        id: 12,
        title: "Effective Tax Year Planning for Freelancers in India",
        excerpt:
            "Tax planning tips tailored for Indian freelancers and gig workers to minimize liabilities.",
        content: `This article includes:
- Understanding presumptive tax schemes,
- Managing advance tax payments,
- Claiming deductions under Section 80GG and 80TTA,
- GST registration thresholds for freelancers.`,
        category: "Tax",
        tags: ["Freelancers", "Income Tax", "Advance Tax", "Tax Planning"],

                                author: {
            name: "Rita Kapoor",
            bio: "Rita Kapoor is a business advisor helping SMEs choose the right software stack.",
            image: "https://example.com/images/authors/rahul-jain.jpg"
        },
        date: "July 1, 2025",
        likes: 54,
        views: 430,
        isLiked: false,
        relatedPosts: [2, 8],
    },
];
