export interface Product {
  id: number
  name: string
  code: string
  price: string
  originalPrice: string
  description: string
  details: string[]
  sizes: string[]
  colors: string[]
  images: ProductImage[]
  category: string
  slug: string
  featured: boolean
  inStock: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  order: number
}

export interface CreateProductRequest {
  name: string
  code: string
  price: string
  originalPrice: string
  description: string
  details: string[]
  sizes: string[]
  colors: string[]
  category: string
  slug: string
  featured: boolean
  inStock: boolean
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: number
}
