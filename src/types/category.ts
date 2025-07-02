import type { Product } from "./product";

export interface CategoryWithProducts {
    category_id: number
    category_name: string
    products: Product[]
    total_products: number
}