const routes = require('next-routes')();

routes
  .add({ name: 'index', pattern: '/', page: 'Index' })
  .add({
    name: 'IndexMana',
    pattern: '/admin',
    page: 'ProductsMana'
  })
  .add({
    name: 'ProductsMana',
    pattern: '/admin/products',
    page: 'ProductsMana'
  })
  .add({
    name: 'DetailProductMana',
    pattern: '/admin/detail-product',
    page: 'DetailProductMana'
  })
  .add({
    name: 'UsersMana',
    pattern: '/admin/users',
    page: 'UsersMana'
  })
  .add({
    name: 'DetailUserMana',
    pattern: '/admin/detail-user',
    page: 'DetailUserMana'
  })
  .add({ name: 'OrderMana', pattern: '/admin/orders', page: 'OrderMana' })
  .add({
    name: 'DetailOrderMana',
    pattern: '/admin/detail-order',
    page: 'DetailOrderMana'
  })
  .add({ name: 'Products', pattern: '/products', page: 'Products' })
  .add({ name: 'ProductsF', pattern: '/products/:id', page: 'Products' })
  .add({
    name: 'DetailProduct',
    pattern: '/detail-products',
    page: 'DetailProduct'
  })
  .add({ name: 'Order', pattern: '/order', page: 'Order' })
  .add({ name: 'login', pattern: '/login', page: 'Login' })
  .add({ name: 'signup', pattern: '/signup', page: 'SignUp' });

module.exports = routes;
