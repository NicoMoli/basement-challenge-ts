export interface Product {
  id: string
  image: string
  price: number
  name: string
  description: string
  options: Array<ProductOptions>
}

interface ProductOptions {
  label: string
  values: Array<string>
}
