require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT|| '8000',
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || '3030',
  svc:process.env.Svc||'https://stark-wildwood-65875.herokuapp.com',
  app: {
    title: 'LivelyTrips',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'React Redux Example: %s',
    }
  },

}, environment);
