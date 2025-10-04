export default async function handler(req, res) {
  // URL Google Apps Script kamu
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxWNix9G4-mDEMN0RpCY8GCMXVPaiz4EovGkbNKfdJy9ywQOIOtwaNmZOCMo1Y0t67mqg/exec";

  // Tambahkan CORS header biar frontend bisa akses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS (CORS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Forward request ke GAS
    const response = await fetch(GAS_URL, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text(); // Bisa text / JSON / HTML

    // Kirim balik hasil dari GAS ke frontend
    return res.status(200).send(data);

  } catch (error) {
    console.error("Proxy Error:", error);
    return res.status(500).json({ error: "Proxy request failed", details: error.message });
  }
}
