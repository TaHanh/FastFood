const routes = require('next-routes')();

routes
  .add({ name: 'index', pattern: '/', page: 'Index' })
  .add({ name: 'products', pattern: '/products', page: 'Products' })
  .add({ name: 'products', pattern: '/products/:id', page: 'DetailProduct' });

module.exports = routes;
