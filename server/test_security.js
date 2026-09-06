// Test script to inspect 400 response
async function inspectError() {
  const url = 'http://localhost:3001/api/orders/create';
  const testPayload = {
    items: [
      {
        id: 1,
        name: 'Matcha Latte Ceremonial',
        quantity: 2,
        temperature: 'Iced / Frío (16 oz)',
        milk: 'Leche de Avena (+ vegetal)',
        syrup: 'Vainilla natural casera',
        sweetener: 'Monk fruit natural',
        notes: '<script>alert("hack")</script> sin hielo',
        priceNumeric: 75
      }
    ]
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testPayload)
  });
  const data = await res.json();
  console.log('Response Status:', res.status);
  console.log('Response Data:', JSON.stringify(data, null, 2));
}

inspectError();
