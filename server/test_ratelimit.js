// Test script to verify Rate Limiting (IP limiting)
async function testRateLimit() {
  const url = 'http://localhost:3001/api/orders/create';
  const payload = {
    items: [{ id: 1, name: 'Té Matcha', quantity: 1, temperature: 'Caliente (12 oz)' }]
  };

  console.log('Sending requests to verify IP rate limit...');
  let blockedAt = null;

  for (let i = 1; i <= 20; i++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const status = res.status;
    if (status === 429) {
      const data = await res.json();
      console.log(`[Rate Limiting Triggered!] Request #${i} returned 429 Too Many Requests:`, data.error);
      blockedAt = i;
      break;
    }
  }

  if (!blockedAt) {
    console.log('Finished without hitting rate limit within 20 requests.');
  }
}

testRateLimit();
