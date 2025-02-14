import React, { useState } from 'react';
import Image from 'next/image';
import { Typography } from '@/components/ui';
import ProductPage from './product-modal-page';

export interface Product {
  name: string;
  shop: string;
  source_url: string;
  image_url: string;
  price: number;
}

interface ProductGridProps {
  products: Product[];
  fetchPairingsForProduct: (product: Product) => Promise<Product[]>;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, fetchPairingsForProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
        {products.map((product, idx) => (
          <div
            className="block transition-all rounded-3xl hover:shadow-lg hover:cursor-pointer"
            key={idx}
            onClick={() => setSelectedProduct(product)}
          >
            <div className="bg-alta-gray-100 dark:bg-alta-gray-900 rounded-3xl">
              <div className="relative w-full h-[200px]">
                <Image
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl"
                  fill
                  src={product.image_url}
                />
              </div>
            </div>
            <div className="text-sm p-3">
              <Typography className="font-semibold">{product.shop}</Typography>
              <Typography className="text-alta-gray-500">{product.name}</Typography>
              <Typography className="font-semibold">${product.price.toFixed(0)}</Typography>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductPage
          fetchPairings={fetchPairingsForProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};
