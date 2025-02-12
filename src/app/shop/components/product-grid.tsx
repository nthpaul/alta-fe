import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/ui';

export interface Product {
  name: string;
  shop: string;
  source_url: string;
  image_url: string;
  price: number;
}

interface ProductGridProps {
  products: Product[]
}

export const ProductGrid: React.ComponentType<ProductGridProps> = ({ products }) => {
  console.log(products);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products?.map((product, idx) => (
        <Link
          className="block transition-all rounded-3xl hover:shadow-lg"
          href={product.source_url}
          key={idx}
          rel="noopener noreferrer"
          target="_blank"
        >
          <div className="bg-alta-gray-100 dark:bg-alta-gray-900 p-2 rounded-3xl">
            <div className='relative w-full h-[200px]'>
              <Image
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl z-0"
                fill
                src={product.image_url}
              />
            </div>

          </div>
          <div className="text-sm p-2">
            <Typography className="font-semibold">{product.shop}</Typography>
            <Typography className="text-alta-gray-500 break-word">{product.name}</Typography>
            <Typography className="font-semibold">${Number(product.price.toFixed(0)).toLocaleString()}</Typography>
          </div>
        </Link>
      ))}
    </div>
  );
};
