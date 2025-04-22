interface Category {
  id: number;
  name: string;
}

interface ProductImage {
  id: number;
  name: string;
  pivot: {
    product_id: number;
    image_id: number;
  }
}

export interface Product {
  id: number;
  unique_id: string;
  name: string;
  short_desc: string;
  image: string;
  video: string | null;
  category_id: number;
  is_published: number;
  price: number;
  stock: number;
  code: string;
  pre_order: string | null;
  stock_location: string | null;
  buying_price: number;
  has_variation: number;
  is_discount: number;
  discount_amount: string;
  discount_date: string;
  created_by: number;
  stock_location_id: number;
  created_at: string;
  updated_at: string;
  product_variation: any[];
  variation_combinations: any[];
  category: Category;
  product_images: ProductImage[];
}