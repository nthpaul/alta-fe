import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Typography, Button } from "@/components/ui";
import ProductPage from "./product-modal-page";
import { Filters } from "@/utils/hooks/use-chat";
import { ListFilterIcon } from "lucide-react";
import clsx from "clsx";

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
  filters: Filters;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  filters,
  products,
  fetchPairingsForProduct,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const allFilters = useMemo(() => {
    return [
      ...(filters.brands || []),
      ...(filters.colors || []),
      ...(filters.materials || []),
      ...(filters.types || []),
    ];
  }, [filters]);

  const toggleFilter = (value: string) => {
    setSelectedFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const isProductMatch = (product: Product) => {
    if (selectedFilters.length === 0) return true;

    const lowerName = product.name.toLowerCase();
    return selectedFilters.some((filter) => lowerName.includes(filter.toLowerCase()));
  };

  const filteredProducts = products.filter(isProductMatch);

  return (
    <div>
      <div className="sticky top-[72px] bg-white dark:bg-alta-black z-[1] flex items-end border-b pb-4 gap-2">
        <Button
          LeadingIcon={() => <ListFilterIcon />}
          className={clsx(
            `bg-alta-gray-100 dark:bg-alta-gray-900 px-4 py-2`,
            selectedFilters.length > 0 && "bg-black dark:bg-white dark:text-black text-white",
          )}
          variant="primary"
          onClick={() => setSelectedFilters([])}
        >
          {selectedFilters.length}
        </Button>

        <div className="overflow-x-auto whitespace-nowrap px-4 pt-2 flex gap-2">
          <div className="absolute left-20 top-0 h-full w-6 bg-gradient-to-r from-white dark:from-alta-black to-transparent pointer-events-none" />
          {allFilters.map((value) => (
            <Button
              className={`px-4 py-2 rounded-full flex-shrink-0 ${
                selectedFilters.includes(value)
                  ? "bg-black dark:bg-white dark:text-black text-white"
                  : "bg-alta-gray-100 dark:bg-alta-gray-900"
              }`}
              key={value}
              onClick={() => toggleFilter(value)}
            >
              {value}
            </Button>
          ))}
          <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white dark:from-alta-black to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
        {filteredProducts.map((product, idx) => (
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
    </div>
  );
};
