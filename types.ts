export interface Product {
  id: string
  image: string
  price: number
  name: string
  description: string
  options: Array<ProductOptions>
  count?: number
}

interface ProductOptions {
  label: string
  values: Array<string>
}
