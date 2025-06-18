import type { Product, ProductImage } from "./types"

// In-memory database (replace with real database in production)
const products: Product[] = [
  {
    id: 2,
    name: "Traditional Persian Rug - Floral Burgundy",
    code: "CPDR1080",
    price: "£2,499.99",
    originalPrice: "£3,199.99",
    description:
      "Exquisite hand-woven Persian rug featuring intricate floral and paisley motifs on a rich burgundy field. This masterpiece showcases traditional craftsmanship with elaborate border designs in complementary colors.",
    details: [
      "Material: 100% premium wool",
      "Hand-knotted construction",
      "Traditional Persian design",
      "Rich burgundy with blue and gold accents",
      "Intricate floral and paisley patterns",
      "Multiple decorative borders",
      "Professional cleaning recommended",
      "Made in Iran",
    ],
    sizes: ["6x9 ft", "8x10 ft", "9x12 ft", "10x14 ft"],
    colors: ["Burgundy/Multi", "Navy/Multi", "Green/Multi"],
    images: [
      { id: "10", url: "/uploads/cpdr1080.webp", alt: "Traditional Persian Rug - Full view", order: 0 },
      {
        id: "11",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10801-1Pd0xNqFrGgY53EPeUh2eE2IRDKT2C.webp",
        alt: "Rug construction and backing detail",
        order: 1,
      },
      {
        id: "12",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10802-wZ8KrxxvTHUv7zgJ3M9nhFWhEbtoh4.webp",
        alt: "Close-up of paisley and floral patterns",
        order: 2,
      },
      {
        id: "13",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10804-kLs7GOOk7X6qnfFdoXdMZQsSCxWHdX.webp",
        alt: "Central medallion and floral motifs detail",
        order: 3,
      },
      {
        id: "14",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10805-XADZcHEwR7muubXwPHOgYR4c27oKjo.webp",
        alt: "Corner detail showing border design",
        order: 4,
      },
      {
        id: "15",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10806-okAWWsq9l5GwQ4xGA5QicDeWJGsW2Z.webp",
        alt: "Rolled rug showing thickness and quality",
        order: 5,
      },
    ],
    category: "Persian Traditional",
    slug: "traditional-persian-rug-floral-burgundy",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Persian Medallion Rug - Classic Red",
    code: "CPDR1090",
    price: "£1,899.99",
    originalPrice: "£2,499.99",
    description:
      "Stunning Persian medallion rug with a bold central design on a deep red field. Features intricate geometric patterns and traditional motifs with an elegant cream border.",
    details: [
      "Material: 100% premium wool",
      "Hand-knotted construction",
      "Central medallion design",
      "Deep red field with cream border",
      "Traditional geometric patterns",
      "High knot density",
      "Durable and long-lasting",
      "Professional cleaning recommended",
      "Made in Iran",
    ],
    sizes: ["5x8 ft", "6x9 ft", "8x10 ft", "9x12 ft"],
    colors: ["Red/Cream", "Blue/Cream", "Green/Cream"],
    images: [
      { id: "16", url: "/uploads/cpdr1090.webp", alt: "Persian Medallion Rug - Full view", order: 0 },
      {
        id: "17",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10901-R3Y1X2AGbxYDQVJL5m31a9pBHGK2yR.webp",
        alt: "Rolled rug showing flexibility and construction quality",
        order: 1,
      },
      {
        id: "18",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10902-o1dWM1XFxBwOgJ2eCZQHYugph6GYdb.webp",
        alt: "Corner and edge detail showing border craftsmanship",
        order: 2,
      },
      {
        id: "19",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10905-bpogdT83sU7MTVaMpTelnolTU5Kkvz.webp",
        alt: "Close-up of cream border with intricate patterns",
        order: 3,
      },
      {
        id: "20",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10904-8Coq0MTsYlJCXKNUz642b1esLUfMGq.webp",
        alt: "Central medallion detail on rich red field",
        order: 4,
      },
      {
        id: "21",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10903-N5SoCU0AOTHJ0YcCfrOxp8SOOqXcSy.webp",
        alt: "Rug backing and construction detail",
        order: 5,
      },
      {
        id: "22",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10906-4KRz6cdgDfhux2CQkmECRCWINXdVZ3.webp",
        alt: "Complete rug layout showing full design",
        order: 6,
      },
    ],
    category: "Persian Medallion",
    slug: "persian-medallion-rug-classic-red",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Vintage Persian Rug - Ivory Elegance",
    code: "CPDR1030",
    price: "£3,299.99",
    originalPrice: "£4,199.99",
    description:
      "Luxurious vintage-style Persian rug in elegant ivory tones. Features a sophisticated central medallion with delicate floral patterns throughout, perfect for refined interiors.",
    details: [
      "Material: 100% premium silk and wool blend",
      "Hand-knotted construction",
      "Vintage-inspired design",
      "Ivory base with subtle color accents",
      "Delicate floral patterns",
      "Central medallion focal point",
      "Ultra-fine weave",
      "Heirloom quality",
      "Professional cleaning recommended",
      "Made in Iran",
    ],
    sizes: ["6x9 ft", "8x10 ft", "9x12 ft", "10x14 ft", "12x15 ft"],
    colors: ["Ivory/Multi", "Cream/Multi", "Beige/Multi"],
    images: [
      { id: "20", url: "/uploads/cpdr1030.webp", alt: "Vintage Persian Rug - Full view", order: 0 },
      {
        id: "21",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10301-0vgy5Bw1OhS53r3VbEtkijdQvbrHl1.webp",
        alt: "Rug edge and fringe detail showing craftsmanship",
        order: 1,
      },
      {
        id: "22",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10303-CBcQvjkxEApDFVJOecGHa0KFqFb6yD.webp",
        alt: "Close-up of intricate floral and paisley patterns",
        order: 2,
      },
      {
        id: "23",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10304-7k9IMbvGvaNxfEAwJ9HtbszUUIGrst.webp",
        alt: "Rolled rug showing flexibility and thickness",
        order: 3,
      },
      {
        id: "24",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10306-uiNBorhhDgTkp6RYo7ruoYmXpplqbY.webp",
        alt: "Rug backing showing construction quality",
        order: 4,
      },
      {
        id: "25",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpdr10305-u6A5jlyb8SUNoJWGRSLUdDX2Q8xTiy.webp",
        alt: "Full-length view showing complete design",
        order: 5,
      },
    ],
    category: "Persian Luxury",
    slug: "vintage-persian-rug-ivory-elegance",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Afghan Yağcıbedir Rug - Triple Diamond",
    code: "AFGN1001",
    price: "£1,799.99",
    originalPrice: "£2,299.99",
    description:
      "Authentic Afghan Yağcıbedir rug featuring three striking diamond medallions on a rich red field. This handcrafted masterpiece showcases traditional tribal patterns with meticulous attention to detail.",
    details: [
      "Material: 100% hand-spun wool",
      "Hand-knotted construction",
      "Triple diamond medallion design",
      "Rich red field with black accents",
      "Traditional tribal patterns",
      "Natural vegetable dyes",
      "Durable construction",
      "Professional cleaning recommended",
      "Made in Afghanistan",
    ],
    sizes: ["4x6 ft", "5x8 ft", "6x9 ft", "8x10 ft"],
    colors: ["Red/Black", "Red/Navy", "Burgundy/Black"],
    images: [
      { id: "24", url: "/uploads/afghan-yagcibedir-1.webp", alt: "Afghan Yağcıbedir Rug - Full view", order: 0 },
      { id: "25", url: "/uploads/afghan-yagcibedir-1.webp", alt: "Diamond medallion detail", order: 1 },
      { id: "26", url: "/uploads/afghan-yagcibedir-1.webp", alt: "Border detail", order: 2 },
    ],
    category: "Afghan Geometric",
    slug: "afghan-yagcibedir-rug-triple-diamond",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Afghan Yağcıbedir Rug - Grid Pattern",
    code: "AFGN1002",
    price: "£1,599.99",
    originalPrice: "£1,999.99",
    description:
      "Distinctive Afghan Yağcıbedir rug with an elegant grid pattern of repeating medallions on a deep red background. This handcrafted piece combines traditional techniques with geometric precision.",
    details: [
      "Material: 100% hand-spun wool",
      "Hand-knotted construction",
      "Grid pattern with repeating medallions",
      "Deep red field with black geometric elements",
      "Traditional border design",
      "Natural vegetable dyes",
      "Exceptional durability",
      "Professional cleaning recommended",
      "Made in Afghanistan",
    ],
    sizes: ["4x6 ft", "5x8 ft", "6x9 ft", "8x10 ft"],
    colors: ["Red/Black", "Red/Navy", "Burgundy/Black"],
    images: [
      {
        id: "27",
        url: "/uploads/afghan-yagcibedir-2.webp",
        alt: "Afghan Yağcıbedir Grid Pattern Rug - Full view",
        order: 0,
      },
      { id: "28", url: "/uploads/afghan-yagcibedir-2.webp", alt: "Grid pattern detail", order: 1 },
      { id: "29", url: "/uploads/afghan-yagcibedir-2.webp", alt: "Border detail", order: 2 },
    ],
    category: "Afghan Geometric",
    slug: "afghan-yagcibedir-rug-grid-pattern",
    featured: false,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 7,
    name: "Afghan Yağcıbedir Rug - Geometric Motifs",
    code: "AFGN1003",
    price: "£1,699.99",
    originalPrice: "£2,199.99",
    description:
      "Exquisite Afghan Yağcıbedir rug featuring symmetrical geometric motifs on a vibrant red field. This handcrafted piece showcases traditional tribal artistry with diamond-shaped medallions and intricate borders.",
    details: [
      "Material: 100% hand-spun wool",
      "Hand-knotted construction",
      "Symmetrical geometric design",
      "Vibrant red field with black and cream accents",
      "Diamond-shaped medallions",
      "Natural vegetable dyes",
      "Exceptional craftsmanship",
      "Professional cleaning recommended",
      "Made in Afghanistan",
    ],
    sizes: ["4x6 ft", "5x8 ft", "6x9 ft", "8x10 ft"],
    colors: ["Red/Black", "Red/Navy", "Burgundy/Black"],
    images: [
      {
        id: "30",
        url: "/uploads/afghan-yagcibedir-3.webp",
        alt: "Afghan Yağcıbedir Geometric Motifs Rug - Full view",
        order: 0,
      },
      { id: "31", url: "/uploads/afghan-yagcibedir-3.webp", alt: "Geometric motif detail", order: 1 },
      { id: "32", url: "/uploads/afghan-yagcibedir-3.webp", alt: "Border detail", order: 2 },
    ],
    category: "Afghan Geometric",
    slug: "afghan-yagcibedir-rug-geometric-motifs",
    featured: false,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 8,
    name: "Afghan Yağcıbedir Rug - Repeating Medallions",
    code: "AFGN1004",
    price: "£1,899.99",
    originalPrice: "£2,399.99",
    description:
      "Stunning Afghan Yağcıbedir rug with a mesmerizing pattern of repeating medallions on a rich red background. This handcrafted masterpiece features traditional tribal designs with exceptional attention to detail.",
    details: [
      "Material: 100% hand-spun wool",
      "Hand-knotted construction",
      "Repeating medallion pattern",
      "Rich red field with black geometric elements",
      "Distinctive border design",
      "Natural vegetable dyes",
      "Superior craftsmanship",
      "Professional cleaning recommended",
      "Made in Afghanistan",
    ],
    sizes: ["4x6 ft", "5x8 ft", "6x9 ft", "8x10 ft"],
    colors: ["Red/Black", "Red/Navy", "Burgundy/Black"],
    images: [
      {
        id: "33",
        url: "/uploads/afghan-yagcibedir-4.webp",
        alt: "Afghan Yağcıbedir Repeating Medallions Rug - Full view",
        order: 0,
      },
      { id: "34", url: "/uploads/afghan-yagcibedir-4.webp", alt: "Medallion detail", order: 1 },
      { id: "35", url: "/uploads/afghan-yagcibedir-4.webp", alt: "Border detail", order: 2 },
    ],
    category: "Afghan Geometric",
    slug: "afghan-yagcibedir-rug-repeating-medallions",
    featured: false,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 9,
    name: "Luxury Floral Rug - Cream Elegance",
    code: "FLRL1001",
    price: "£3,999.99",
    originalPrice: "£4,999.99",
    description:
      "Opulent floral rug featuring exquisite botanical patterns on a cream background. This luxurious piece showcases intricate floral and paisley motifs with a sophisticated color palette, perfect for elegant interiors.",
    details: [
      "Material: Premium silk and wool blend",
      "Hand-knotted construction",
      "Intricate floral and paisley design",
      "Cream background with pastel accents",
      "Ornate decorative border",
      "Ultra-fine knot density",
      "Heirloom quality",
      "Professional cleaning recommended",
      "Made in Iran",
    ],
    sizes: ["6x9 ft", "8x10 ft", "9x12 ft", "10x14 ft", "12x15 ft"],
    colors: ["Cream/Multi", "Ivory/Multi", "Beige/Multi"],
    images: [
      { id: "36", url: "/uploads/floral-cream-rug.webp", alt: "Luxury Floral Cream Rug - Full view", order: 0 },
      {
        id: "37",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr20402-wCliu2hMdcX7i5QYqApJ7Zu11QXAXX.webp",
        alt: "Close-up of intricate floral and paisley patterns on cream field",
        order: 1,
      },
      {
        id: "38",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr20404-gTNDJa1YC5EXRrV2hIXW9qd01ErmGt.webp",
        alt: "Rug backing and construction quality detail",
        order: 2,
      },
      {
        id: "39",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr20403-hrzYgoBMQ252V8wJqLYZ2JDMKklmmL.webp",
        alt: "Rolled rug showing flexibility and premium materials",
        order: 3,
      },
      {
        id: "40",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr20401-KyxeLOcariScsUCgwfq0VvqfH1MshW.webp",
        alt: "Edge and corner detail showing fine finishing work",
        order: 4,
      },
      {
        id: "41",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr20406-HyYBh939Qt4GfykULeprvE7LvqUrwk.webp",
        alt: "Complete rug layout showing full luxury design",
        order: 5,
      },
      {
        id: "42",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr20405-9mpud1KZJsnzgFDMyM0vxLQfQRzdH6.webp",
        alt: "Ornate border detail with gold and floral motifs",
        order: 6,
      },
    ],
    category: "Luxury Floral",
    slug: "luxury-floral-rug-cream-elegance",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 10,
    name: "Royal Blue Medallion Rug - Imperial Collection",
    code: "RYLB1001",
    price: "£4,299.99",
    originalPrice: "£5,499.99",
    description:
      "Majestic royal blue rug featuring a spectacular central medallion with ornate detailing. This statement piece combines rich blue tones with intricate patterns and decorative borders for a truly regal appearance.",
    details: [
      "Material: Premium silk and wool blend",
      "Hand-knotted construction",
      "Spectacular central medallion design",
      "Royal blue background with cream and gold accents",
      "Elaborate decorative border",
      "Ultra-high knot density",
      "Museum quality craftsmanship",
      "Professional cleaning recommended",
      "Made in Iran",
    ],
    sizes: ["6x9 ft", "8x10 ft", "9x12 ft", "10x14 ft", "12x15 ft"],
    colors: ["Royal Blue/Cream", "Navy/Gold", "Sapphire/Ivory"],
    images: [
      { id: "39", url: "/uploads/royal-blue-rug.webp", alt: "Royal Blue Medallion Rug - Full view", order: 0 },
      {
        id: "40",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr30102-iXVCjDfDNtJmMNFWivjO4gv9Mhihz1.webp",
        alt: "Close-up of intricate floral patterns on royal blue field",
        order: 1,
      },
      {
        id: "41",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr30101-6e3z4DeiFA6Qu3q7wq9NAZCukTqHTU.webp",
        alt: "Edge and corner detail showing premium binding and border craftsmanship",
        order: 2,
      },
      {
        id: "42",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr30103-Qw3biJwOD9eAMttGvxYMwti2WwJHrw.webp",
        alt: "Rolled rug showing flexibility and premium construction",
        order: 3,
      },
      {
        id: "43",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr30105-nBdNuLEtkT1hkODgslcVuXT6BIUMX6.webp",
        alt: "Central medallion detail with intricate floral and geometric patterns",
        order: 4,
      },
      {
        id: "44",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr30104-ajoQ8943RAvJDWInR82IQqczPTGGgJ.webp",
        alt: "Corner detail with rug folded showing backing quality",
        order: 5,
      },
      {
        id: "45",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr30106-GFqMEkX4RqFBeYPouYyMEHNTiDChBJ.webp",
        alt: "Complete rug layout showing full medallion design and ornate border",
        order: 6,
      },
    ],
    category: "Luxury Medallion",
    slug: "royal-blue-medallion-rug-imperial-collection",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 11,
    name: "Silver Border Rug - Modern Classic",
    code: "SLVR1001",
    price: "£2,799.99",
    originalPrice: "£3,499.99",
    description:
      "Sophisticated silver rug with a minimalist center and striking black decorative border. This contemporary piece combines modern simplicity with traditional border patterns for a versatile, elegant look.",
    details: [
      "Material: Premium wool with silk accents",
      "Hand-knotted construction",
      "Minimalist silver center",
      "Black decorative border with medallion motifs",
      "Contemporary interpretation of classic design",
      "High knot density",
      "Exceptional durability",
      "Professional cleaning recommended",
      "Made in Turkey",
    ],
    sizes: ["5x8 ft", "6x9 ft", "8x10 ft", "9x12 ft"],
    colors: ["Silver/Black", "Ivory/Black", "Gray/Black"],
    images: [
      { id: "42", url: "/uploads/silver-border-rug.webp", alt: "Silver Border Rug - Full view", order: 0 },
      { id: "43", url: "/uploads/silver-border-rug.webp", alt: "Border detail", order: 1 },
      { id: "44", url: "/uploads/silver-border-rug.webp", alt: "Corner detail", order: 2 },
    ],
    category: "Modern Contemporary",
    slug: "silver-border-rug-modern-classic",
    featured: false,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 12,
    name: "Black Pattern Rug - Monochrome Elegance",
    code: "BLCK1001",
    price: "£2,599.99",
    originalPrice: "£3,299.99",
    description:
      "Striking black rug with an intricate all-over pattern and elegant cream border. This sophisticated piece combines bold contrast with delicate detailing for a dramatic yet refined statement.",
    details: [
      "Material: Premium wool",
      "Hand-knotted construction",
      "All-over intricate pattern",
      "Black field with cream border",
      "Geometric motifs throughout",
      "High knot density",
      "Exceptional durability",
      "Professional cleaning recommended",
      "Made in Turkey",
    ],
    sizes: ["5x8 ft", "6x9 ft", "8x10 ft", "9x12 ft"],
    colors: ["Black/Cream", "Charcoal/Ivory", "Black/Silver"],
    images: [
      { id: "45", url: "/uploads/black-pattern-rug.webp", alt: "Black Pattern Rug - Full view", order: 0 },
      { id: "46", url: "/uploads/black-pattern-rug.webp", alt: "Pattern detail", order: 1 },
      { id: "47", url: "/uploads/black-pattern-rug.webp", alt: "Border detail", order: 2 },
    ],
    category: "Modern Geometric",
    slug: "black-pattern-rug-monochrome-elegance",
    featured: false,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 13,
    name: "Navy Pattern Rug - Timeless Collection",
    code: "NAVY1001",
    price: "£2,499.99",
    originalPrice: "£3,199.99",
    description:
      "Sophisticated navy rug featuring an intricate all-over pattern with a light cream border. This elegant piece combines deep blue tones with delicate detailing for a timeless, versatile addition to any space.",
    details: [
      "Material: Premium wool",
      "Hand-knotted construction",
      "All-over intricate pattern",
      "Navy field with cream border",
      "Geometric motifs throughout",
      "High knot density",
      "Exceptional durability",
      "Professional cleaning recommended",
      "Made in Turkey",
    ],
    sizes: ["5x8 ft", "6x9 ft", "8x10 ft", "9x12 ft"],
    colors: ["Navy/Cream", "Navy/Silver", "Navy/Ivory"],
    images: [
      { id: "48", url: "/uploads/navy-pattern-rug.webp", alt: "Navy Pattern Rug - Full view", order: 0 },
      { id: "49", url: "/uploads/navy-pattern-rug.webp", alt: "Pattern detail", order: 1 },
      { id: "50", url: "/uploads/navy-pattern-rug.webp", alt: "Border detail", order: 2 },
    ],
    category: "Modern Geometric",
    slug: "navy-pattern-rug-timeless-collection",
    featured: false,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 14,
    name: "Intricate Pattern Rug - Sophisticated Black",
    code: "CPR3050",
    price: "£2,899.99",
    originalPrice: "£3,699.99",
    description:
      "Sophisticated rug featuring an intricate all-over pattern on a black field with an elegant cream border. This masterpiece combines bold contrast with delicate geometric detailing for a striking contemporary statement.",
    details: [
      "Material: Premium wool",
      "Hand-knotted construction",
      "All-over intricate geometric pattern",
      "Black field with cream decorative border",
      "High knot density for exceptional detail",
      "Contemporary interpretation of classic design",
      "Exceptional durability",
      "Professional cleaning recommended",
      "Made in Turkey",
    ],
    sizes: ["5x8 ft", "6x9 ft", "8x10 ft", "9x12 ft"],
    colors: ["Black/Cream", "Charcoal/Ivory", "Black/Beige"],
    images: [
      { id: "51", url: "/uploads/intricate-pattern-rug.webp", alt: "Intricate Pattern Rug - Full view", order: 0 },
      { id: "52", url: "/uploads/intricate-pattern-rug.webp", alt: "Pattern detail", order: 1 },
      { id: "53", url: "/uploads/intricate-pattern-rug.webp", alt: "Border detail", order: 2 },
    ],
    category: "Modern Geometric",
    slug: "intricate-pattern-rug-sophisticated-black",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 15,
    name: "Burgundy Floral Masterpiece - Royal Collection",
    code: "CPR3040",
    price: "£4,799.99",
    originalPrice: "£5,999.99",
    description:
      "Opulent burgundy rug featuring elaborate floral and paisley patterns in blue and cream. This royal masterpiece showcases traditional Persian artistry with an ornate decorative border, perfect for the most discerning interiors.",
    details: [
      "Material: Premium silk and wool blend",
      "Hand-knotted construction",
      "Elaborate floral and paisley design",
      "Rich burgundy field with blue and cream accents",
      "Ornate decorative border",
      "Ultra-fine knot density",
      "Museum quality craftsmanship",
      "Professional cleaning recommended",
      "Made in Iran",
    ],
    sizes: ["6x9 ft", "8x10 ft", "9x12 ft", "10x14 ft", "12x15 ft"],
    colors: ["Burgundy/Blue", "Red/Navy", "Wine/Cream"],
    images: [
      { id: "54", url: "/uploads/burgundy-floral-rug.webp", alt: "Burgundy Floral Masterpiece - Full view", order: 0 },
      { id: "55", url: "/uploads/burgundy-floral-rug.webp", alt: "Floral pattern detail", order: 1 },
      { id: "56", url: "/uploads/burgundy-floral-rug.webp", alt: "Border detail", order: 2 },
    ],
    category: "Luxury Floral",
    slug: "burgundy-floral-masterpiece-royal-collection",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 16,
    name: "Cream Elegance Rug - Red Border Classic",
    code: "CPR3030",
    price: "£3,599.99",
    originalPrice: "£4,499.99",
    description:
      "Elegant rug with a cream center field decorated with delicate floral patterns and a striking red border. This classic Persian design offers beautiful contrast and sophisticated styling for refined interiors.",
    details: [
      "Material: Premium wool with silk highlights",
      "Hand-knotted construction",
      "Delicate floral patterns on cream field",
      "Striking red border with geometric motifs",
      "Classic Persian design elements",
      "High knot density",
      "Exceptional color contrast",
      "Professional cleaning recommended",
      "Made in Iran",
    ],
    sizes: ["6x9 ft", "8x10 ft", "9x12 ft", "10x14 ft"],
    colors: ["Cream/Red", "Ivory/Burgundy", "Beige/Wine"],
    images: [
      { id: "57", url: "/uploads/cream-red-border-rug.webp", alt: "Cream Elegance Rug - Full view", order: 0 },
      { id: "58", url: "/uploads/cream-red-border-rug.webp", alt: "Floral pattern detail", order: 1 },
      { id: "59", url: "/uploads/cream-red-border-rug.webp", alt: "Red border detail", order: 2 },
    ],
    category: "Traditional Floral",
    slug: "cream-elegance-rug-red-border-classic",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 17,
    name: "Burgundy Medallion Rug - Imperial Paisley",
    code: "CPR3020",
    price: "£4,999.99",
    originalPrice: "£6,299.99",
    description:
      "Majestic burgundy rug featuring a spectacular central medallion with intricate paisley and floral designs. This imperial masterpiece showcases the finest Persian craftsmanship with elaborate decorative borders.",
    details: [
      "Material: Premium silk and wool blend",
      "Hand-knotted construction",
      "Spectacular central medallion design",
      "Deep burgundy field with paisley motifs",
      "Elaborate decorative border",
      "Ultra-high knot density",
      "Imperial quality craftsmanship",
      "Professional cleaning recommended",
      "Made in Iran",
    ],
    sizes: ["6x9 ft", "8x10 ft", "9x12 ft", "10x14 ft", "12x15 ft"],
    colors: ["Burgundy/Multi", "Wine/Gold", "Deep Red/Cream"],
    images: [
      { id: "60", url: "/uploads/burgundy-medallion-rug.webp", alt: "Burgundy Medallion Rug - Full view", order: 0 },
      { id: "61", url: "/uploads/burgundy-medallion-rug.webp", alt: "Central medallion detail", order: 1 },
      { id: "62", url: "/uploads/burgundy-medallion-rug.webp", alt: "Border detail", order: 2 },
    ],
    category: "Luxury Medallion",
    slug: "burgundy-medallion-rug-imperial-paisley",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 18,
    name: "Blue-Gray Paisley Rug - Serene Collection",
    code: "CPR2070",
    price: "£3,199.99",
    originalPrice: "£3,999.99",
    description:
      "Refined rug with a blue-gray center field featuring repeating floral medallions and paisley patterns. This sophisticated piece offers a serene color palette perfect for contemporary and traditional interiors alike.",
    details: [
      "Material: Premium wool",
      "Hand-knotted construction",
      "Repeating floral medallions and paisley patterns",
      "Blue-gray field with cream border",
      "Sophisticated color palette",
      "High knot density",
      "Versatile design for any decor",
      "Professional cleaning recommended",
      "Made in Turkey",
    ],
    sizes: ["5x8 ft", "6x9 ft", "8x10 ft", "9x12 ft"],
    colors: ["Blue-Gray/Cream", "Sage/Ivory", "Steel Blue/Beige"],
    images: [
      { id: "63", url: "/uploads/blue-gray-paisley-rug.webp", alt: "Blue-Gray Paisley Rug - Full view", order: 0 },
      { id: "64", url: "/uploads/blue-gray-paisley-rug.webp", alt: "Paisley pattern detail", order: 1 },
      { id: "65", url: "/uploads/blue-gray-paisley-rug.webp", alt: "Border detail", order: 2 },
    ],
    category: "Modern Floral",
    slug: "blue-gray-paisley-rug-serene-collection",
    featured: false,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 19,
    name: "Navy Floral Rug - Botanical Luxury",
    code: "CPR2090",
    price: "£3,799.99",
    originalPrice: "£4,699.99",
    description:
      "Impressive navy rug with a densely packed floral and botanical pattern in cream and gold. This luxurious piece features an all-over design with exceptional detail and a complementary cream border.",
    details: [
      "Material: Premium wool with silk accents",
      "Hand-knotted construction",
      "Dense floral and botanical patterns",
      "Navy field with cream and gold motifs",
      "All-over design with exceptional detail",
      "Cream decorative border",
      "High knot density",
      "Professional cleaning recommended",
      "Made in Iran",
    ],
    sizes: ["6x9 ft", "8x10 ft", "9x12 ft", "10x14 ft"],
    colors: ["Navy/Cream", "Navy/Gold", "Deep Blue/Ivory"],
    images: [
      { id: "66", url: "/uploads/navy-floral-rug.webp", alt: "Navy Floral Rug - Full view", order: 0 },
      { id: "67", url: "/uploads/navy-floral-rug.webp", alt: "Floral pattern detail", order: 1 },
      { id: "68", url: "/uploads/navy-floral-rug.webp", alt: "Border detail", order: 2 },
    ],
    category: "Luxury Floral",
    slug: "navy-floral-rug-botanical-luxury",
    featured: false,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 20,
    name: "Persian Medallion Rug - Ivory Elegance with Navy Border",
    code: "CPR2030",
    price: "£5,299.99",
    originalPrice: "£6,799.99",
    description:
      "Exquisite Persian medallion rug featuring a spectacular central star medallion on an ivory field with intricate floral and paisley motifs. The striking navy blue border showcases traditional Persian artistry with elaborate decorative elements.",
    details: [
      "Material: Premium silk and wool blend",
      "Hand-knotted construction",
      "Spectacular central star medallion design",
      "Ivory field with navy blue decorative border",
      "Intricate floral and paisley patterns throughout",
      "Ultra-high knot density",
      "Museum quality craftsmanship",
      "Professional cleaning recommended",
      "Made in Iran",
    ],
    sizes: ["6x9 ft", "8x10 ft", "9x12 ft", "10x14 ft", "12x15 ft"],
    colors: ["Ivory/Navy", "Cream/Navy", "Beige/Navy"],
    images: [
      {
        id: "69",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr2030-OCQipWMH1xyXtXe4ST5DeUZ149gHzk.webp",
        alt: "Persian Medallion Rug Ivory Navy - Full view",
        order: 0,
      },
    ],
    category: "Luxury Medallion",
    slug: "persian-medallion-rug-ivory-elegance-navy-border",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 21,
    name: "Persian Prayer Rug - Burgundy Mihrab Masterpiece",
    code: "CPR2050",
    price: "£4,599.99",
    originalPrice: "£5,899.99",
    description:
      "Magnificent Persian prayer rug featuring the traditional mihrab (prayer niche) design with a rich burgundy field and intricate floral patterns. This sacred design showcases exceptional craftsmanship with elaborate cream borders and detailed Islamic motifs.",
    details: [
      "Material: Premium silk and wool blend",
      "Hand-knotted construction",
      "Traditional mihrab (prayer niche) design",
      "Rich burgundy field with cream border",
      "Intricate Islamic floral and geometric patterns",
      "Sacred prayer rug design",
      "Ultra-fine knot density",
      "Heirloom quality craftsmanship",
      "Professional cleaning recommended",
      "Made in Iran",
    ],
    sizes: ["4x6 ft", "5x8 ft", "6x9 ft", "8x10 ft"],
    colors: ["Burgundy/Cream", "Wine/Ivory", "Deep Red/Beige"],
    images: [
      {
        id: "70",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr2050-00GKVfDaqRjQfguUiIx84VnwAu354V.webp",
        alt: "Persian Prayer Rug Burgundy Mihrab - Full view",
        order: 0,
      },
    ],
    category: "Persian Prayer Rugs",
    slug: "persian-prayer-rug-burgundy-mihrab-masterpiece",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 22,
    name: "Persian Medallion Rug - Cream Sunburst with Navy Border",
    code: "CPR2060",
    price: "£4,899.99",
    originalPrice: "£6,299.99",
    description:
      "Stunning Persian medallion rug featuring an elaborate sunburst medallion design on a cream field with a sophisticated navy border. This masterpiece combines traditional Persian artistry with intricate geometric and floral patterns.",
    details: [
      "Material: Premium silk and wool blend",
      "Hand-knotted construction",
      "Elaborate sunburst medallion design",
      "Cream field with navy decorative border",
      "Intricate geometric and floral patterns",
      "Traditional Persian corner motifs",
      "High knot density for exceptional detail",
      "Museum quality craftsmanship",
      "Professional cleaning recommended",
      "Made in Iran",
    ],
    sizes: ["6x9 ft", "8x10 ft", "9x12 ft", "10x14 ft", "12x15 ft"],
    colors: ["Cream/Navy", "Ivory/Navy", "Beige/Navy"],
    images: [
      {
        id: "71",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cpr2060-9YQPUR2pvYqnLHtOcI4PIG3PjXKOHt.webp",
        alt: "Persian Medallion Rug Cream Sunburst Navy - Full view",
        order: 0,
      },
    ],
    category: "Luxury Medallion",
    slug: "persian-medallion-rug-cream-sunburst-navy-border",
    featured: true,
    inStock: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

let nextProductId = 23
let nextImageId = 1022

export const db = {
  // Products
  getAllProducts: (): Product[] => products,

  getProductById: (id: number): Product | undefined => products.find((p) => p.id === id),

  getProductBySlug: (slug: string): Product | undefined => products.find((p) => p.slug === slug),

  createProduct: (productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product => {
    const product: Product = {
      ...productData,
      id: nextProductId++,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    products.push(product)
    return product
  },

  updateProduct: (id: number, updates: Partial<Product>): Product | null => {
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) return null

    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return products[index]
  },

  deleteProduct: (id: number): boolean => {
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) return false

    products.splice(index, 1)
    return true
  },

  // Images
  addImageToProduct: (productId: number, image: Omit<ProductImage, "id">): ProductImage | null => {
    const product = products.find((p) => p.id === productId)
    if (!product) return null

    const newImage: ProductImage = {
      ...image,
      id: (nextImageId++).toString(),
    }

    product.images.push(newImage)
    product.updatedAt = new Date().toISOString()

    return newImage
  },

  updateImageOrder: (productId: number, imageOrders: { id: string; order: number }[]): boolean => {
    const product = products.find((p) => p.id === productId)
    if (!product) return false

    imageOrders.forEach(({ id, order }) => {
      const image = product.images.find((img) => img.id === id)
      if (image) {
        image.order = order
      }
    })

    product.images.sort((a, b) => a.order - b.order)
    product.updatedAt = new Date().toISOString()

    return true
  },

  deleteImage: (productId: number, imageId: string): boolean => {
    const product = products.find((p) => p.id === productId)
    if (!product) return false

    const index = product.images.findIndex((img) => img.id === imageId)
    if (index === -1) return false

    product.images.splice(index, 1)
    product.updatedAt = new Date().toISOString()

    return true
  },
}
