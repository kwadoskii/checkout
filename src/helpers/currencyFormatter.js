export default function formatCurrency(amount) {
  return "₦" + parseFloat(amount).toLocaleString("en");
}
