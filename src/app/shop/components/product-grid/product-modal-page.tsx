import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Typography, Button } from '@/components/ui';
import { XIcon } from 'lucide-react';

export interface Product {
  name: string;
  shop: string;
  source_url: string;
  image_url: string;
  price: number;
}

interface ProductPageProps {
  product: Product;
  onClose: () => void;
  fetchPairings: (product: Product) => Promise<Product[]>;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, onClose, fetchPairings }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(product);
  const [isLoading, setIsLoading] = useState(true);

  // react fetches twice with strictMode enabeld by default in development mode to help detect weird side effects
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current || !isLoading) return;

    const fetchPairingsForProduct = async () => {
      const pairings = await fetchPairings(product);
      setProducts([product, ...pairings]);
      setIsLoading(false);
    };

    fetchPairingsForProduct();
    hasFetched.current = true;
  }, [product, fetchPairings, isLoading]);

  return (
    <div className="fixed inset-0 bg-white dark:bg-alta-black z-50 p-4 md:p-6 overflow-auto flex justify-center">
      <div className="max-w-3xl">
        <div className="flex gap-8 items-start justify-between">
          <div className="flex items-start gap-4">
            <Image
              alt={product.name}
              className="rounded-lg"
              height={50}
              src={product.image_url}
              width={50}
            />
            <Typography variant="sans-h3">{product.name}</Typography>
          </div>
          <Button MainIcon={() => <XIcon />} onClick={onClose} />
        </div>

        <div className="flex mt-8 gap-4 w-full">
          {isLoading ? (
            <div className="grid grid-cols-1 max-w-24 sm:max-w-32 w-full gap-4 p-4 rounded-3xl bg-alta-gray-100 dark:bg-alta-gray-900 animate-pulse" />
          ) : (
            <div className="grid grid-cols-1 max-w-24 sm:max-w-32 gap-4 p-2 sm:p-4 rounded-3xl bg-alta-gray-100 dark:bg-alta-gray-900">
              {!isLoading &&
                !!products &&
                products.map((p, idx) => (
                  <div
                    className="hover:cursor-pointer relative"
                    key={idx}
                    onClick={() => setSelectedProduct(p)}
                  >
                    <Image
                      alt={p.name}
                      className="rounded-2xl sm:rounded-xl"
                      height={200}
                      src={p.image_url}
                      width={150}
                    />
                  </div>
                ))}
            </div>
          )}

          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center gap-8">
              <div className="flex flex-col items-center justify-center rounded-xl sm:rounded-3xl gap-2">
                <Image
                  alt={product.name}
                  className="rounded-3xl"
                  height={500}
                  src={selectedProduct.image_url}
                  width={500}
                />
                <Typography className="text-alta-gray-500 max-w-80 text-center" variant="body-md">
                  {selectedProduct.name}
                </Typography>
                <Typography className="font-semibold text-alta-gray-500" variant="body-md">
                  ${selectedProduct.price.toFixed(0)}
                </Typography>
              </div>
              <Button
                className="text-xl bg-alta-gray-900 rounded-3xl p-4 text-alta-white w-full transition ease-linear hover:bg-alta-700"
                variant="primary"
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
