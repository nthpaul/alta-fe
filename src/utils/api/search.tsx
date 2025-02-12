export const searchProducts = async (query: string, isFetchPairing = false, maxNumProducts = 10) => {
  const res = await fetch("http://localhost:8000/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, isFetchPairing, maxNumProducts })
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};
