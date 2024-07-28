export interface ColorProduct {
  id: number
  name: string
  images: string[]
  price: string
  description: string
  sizes: number[]
}

export interface Product {
  id: number
  name: string
  colors: ColorProduct[]
}

export interface Size {
  label: string 
  id: number
  number: number
}




 