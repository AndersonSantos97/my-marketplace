export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  seller_id: number;
  stock: number;
  is_digital: boolean; // <--- cambia aquí
  file_url: string;
  category_id: number;
  status_id: number;
  artist_id: number;
  total_sold?: number
}