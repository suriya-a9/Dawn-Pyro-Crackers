export async function getProducts() {
  const res = await fetch(
    "http://localhost/dawn-crackers/public/api/productlist",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();
  const productsWithImageUrl = data.results.map((product) => ({
    ...product,
    image: `http://localhost/dawn-crackers/public/image/product/${product.image}`,
  }));

  return productsWithImageUrl;
}
