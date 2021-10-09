export interface IconItems {
  id: number
  pack_id: number
  category: string
  description: string
  premium: any
  images: {
    png: {
      128: string
      512: string
    }
    svg: string
  }
}