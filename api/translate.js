export default async function (req) {
  const { text, lang } = await req.json();
  const res = await fetch('https://libretranslate.com/translate', {
    method: 'POST',
    body: JSON.stringify({ q: text, source: 'en', target: lang }),
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  return new Response(JSON.stringify(data));
}
