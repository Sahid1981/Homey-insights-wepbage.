
// api/token.js
export default async function handler(req, res) {
  try {
    const tokenRes = await fetch("https://api.homey.app/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.client_id,    
        client_secret: process.env.client_secret
      }),
    });

    const token = await tokenRes.json();
    return res.status(200).json(token);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
