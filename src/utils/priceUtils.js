export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(price);
};

export const getDiscountedPrice = (price, discount) => {
  return price - (price * discount / 100);
};
