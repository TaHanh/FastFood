const routes = require('next-routes')();

routes
  .add({ name: 'index', pattern: '/', page: 'Index' })
  .add({ name: 'ProductsMana', pattern: '/admin/products', page: 'ProductsMana' })
  .add({
    name: 'DetailProductMana',
    pattern: '/admin/detail-product',
    page: 'DetailProductMana'
  })
  .add({ name: 'OrderMana', pattern: '/admin/order', page: 'OrderMana' })
  .add({ name: 'Products', pattern: '/products', page: 'Products' })
  .add({ name: 'ProductsF', pattern: '/products/food', page: 'Products' })
  .add({ name: 'ProductsD', pattern: '/products/drink', page: 'Products' })
  .add({ name: 'DetailProduct', pattern: '/products/:id', page: 'DetailProduct' });

module.exports = routes;
