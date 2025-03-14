import CryptoJS from "crypto-js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch(
        "http://localhost/pasumaibhoomi/api/productlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const encryptedData = await response.text();
      const bytes = CryptoJS.AES.decrypt(
        encryptedData,
        "3mtree8u51n33ss501ut10nm33n6v33r"
      );
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      const products = JSON.parse(decryptedData).results;

      res.status(200).json({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
