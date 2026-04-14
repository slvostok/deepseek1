import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { products as staticProducts } from './products';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  sizes: string[];
  inStock: boolean;
  features?: string[]; // Optional product features
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-dfbfad0c`;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      
      // If there are products from database, use them; otherwise use static products
      if (data.products && data.products.length > 0) {
        setProducts(data.products);
      } else {
        setProducts(staticProducts);
      }
    } catch (err) {
      console.error('Error fetching products from database:', err);
      // Fall back to static products
      setProducts(staticProducts);
      setError('Используются статические товары');
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
}