export function formattCurrency(num: number) {
  const FORMATTED_CURRENCY = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  });

  return FORMATTED_CURRENCY.format(num);
}
