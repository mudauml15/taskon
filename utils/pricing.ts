export function calculateTotal(pricePerHour: number, hours: number) {
  const subtotal = pricePerHour * hours;
  const fee = subtotal * 0.15; // 15% platform fee
  const total = subtotal + fee;

  return {
    subtotal,
    fee,
    total,
  };
}
