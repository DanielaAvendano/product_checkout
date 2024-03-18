interface Product {
  product_id: number;
  product_name: string;
  ordered_quantity: number;
  product_price: number;
  
}

export const products: Product[] = [
  { 
    product_id: 1, 
    product_name: "Maple Syrup", 
    ordered_quantity: 0,
    product_price: 14.99
  },
  // ...
];
