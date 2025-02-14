export const searchProducts = async (query: string, is_fetch_pairing = false, max_num_products = 10) => {
  const res = await fetch("http://localhost:8000/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, is_fetch_pairing, max_num_products })
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};
