export type Data = {
   products : Product[]
}

export type Product = {
    id: number,
    generalType: string,
    type: string,
    attributes: string[],
    price: number,
    imagePath: string,
    rating?: number[],
    salesCount?: number,
    averageRating: number
}