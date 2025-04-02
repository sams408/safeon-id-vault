
// Re-export all product-related functions and types
export type { Product } from './types';
export { fetchProducts, fetchProductById } from './queries';
export { createProduct, updateProduct, deleteProduct } from './mutations';
