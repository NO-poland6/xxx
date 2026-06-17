// Pośrednik (proxy) do Anthropic API — klucz trzymany bezpiecznie po stronie serwera.
// Front (index.html) woła ten endpoint pod adresem /api/generate.
// Wymaga zmiennej środowiskowej ANTHROPIC_API_KEY ustawionej w panelu Vercel.

module.exports = async (req, res) => {
  // CORS — pozwala wołać endpoint także z iframe na Shoperze (inna domena).
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    res.status(500).json({ error: "Brak ANTHROPIC_API_KEY w zmiennych środowiskowych Vercel." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const prompt = body.prompt || ("Przygotuj zwięzły opis rośliny na etykietę: " + (body.name || ""));

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await r.json();
    // Przekazujemy odpowiedź Anthropic 1:1 — front sam wyciąga z niej JSON rośliny.
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) });
  }
};
