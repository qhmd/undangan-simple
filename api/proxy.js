export default async function handler(req, res) {
  // URL Google Apps Script kamu
  const GAS_URL = "https://script.google.com/macros/s/AKfycbxntFrA5lsgMhvjnmiUuA3B5T8Gr_sM8EFf2-wF1Y9UVelsXIviw9Xs_3PNxfQsUo8rPw/exec";

  try {
    const response = await fetch(GAS_URL, {
      method: req.method, // bisa GET atau POST
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method === "POST" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text(); // bisa juga pakai .json() kalau pasti JSON

    // Tambahkan CORS header biar frontend bisa akses
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight OPTIONS
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // Kirim balik hasil dari GAS
    res.status(200).send(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "Proxy request failed" });
  }
}
