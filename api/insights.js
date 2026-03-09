
export default async function handler(req, res) {
  try {

    const tokenRes = await fetch(`${req.headers.origin}/api/token`);
    const tokenData = await tokenRes.json();

    const url = `${process.env.homey_base_url}/api/manager/insights/log/
      homey:device:YOUR_DEVICE_ID/
      homey:device:YOUR_DEVICE_ID:measure_temperature/entry?
      resolution=hour`
      .replace(/\s+/g, "");

    const insightRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`
      }
    });

    const data = await insightRes.json();
    return res.status(200).json(data);

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
