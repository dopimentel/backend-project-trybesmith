const validOrderFromDB = {
  id: 1,
  userId: 1,
};

const validOrderFromDB2 = {
  id: 2,
  userId: 2,
};

const validOrder = {
  id: 1,
  userId: 1,
  productIds: [1, 2],
};

const validOrder2 = {
  id: 2,
  userId: 2,
  productIds: [3],
};

const ordersWithProducts = [
  validOrder,
  validOrder2,
];

export default {
  validOrder,
  validOrderFromDB,
  validOrderFromDB2,
  validOrder2,
  ordersWithProducts,
};
