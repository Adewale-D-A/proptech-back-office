export default function currencyFormat(
  value: number | string,
  currency = "NGN"
) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
  }).format(Number(value));
}
