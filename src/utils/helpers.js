export const formatPrice = (number) => {
  const newNumber = new Intl.NumberFormat('en-SA', {
    style: 'currency',
    currency: 'SAR',
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, type) => {
  const unique = data.map((item) => item[type]);

  if (type === 'colors') {
    const uniqueColors = unique.flat();

    return ['all', ...new Set(uniqueColors)];
  }
  return ['all', ...new Set(unique)];
};
