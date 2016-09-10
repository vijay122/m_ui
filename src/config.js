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
  host: process.env.HOST = 'localhost',
  port: process.env.PORT= '7000',
  apiHost: process.env.APIHOST = 'localhost',
  apiPort: process.env.APIPORT = '3030',
  svc:process.env.Svc='http://localhost:8000',
  app: {
    title: 'LivelyTrips',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: '',
    }
  },

}, environment);
