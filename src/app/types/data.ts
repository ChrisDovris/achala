export type Data = {
   products : Product[]
}

export type Product = {
    id: number,
    title: string,
    generalType: string,
    type: string,
    discription: string,
    attributes: string[],
    price: number,
    imagePath: string,
    rating?: number[],
    salesCount?: number,
    averageRating: number,
    quantity?: number
}
