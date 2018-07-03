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
  port: process.env.PORT = '7000',
  apiHost: process.env.APIHOST = 'localhost',
  apiPort: process.env.APIPORT = '3030',
  svc: process.env.Svc = 'http://localhost:8000',//'http://159.89.170.165:8000',//'http://localhost:8000', //'http://159.89.170.165:8000', //
    blogsvc: 'http://159.89.170.165:5000', //'http://localhost:8000', //148.72.244.18
  staticassets: '../../static/dist',
  app: {
    title: 'LivelyTrips',
    description: 'trip planner,cheap travel packages,tours,sight seeing,honeymoon,trekkings and pilgrim trips, Livelytrips',
    head: {
      titleTemplate: '',
    }
  },
  home: {
    title: 'trip planner,cheap travel packages,tours,sight seeing,honeymoon,trekkings and pilgrim trips, Livelytrips',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: '',
    }
  },
  detail: {
    title: 'LivelyTrips',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: '',
    }
  },

}, environment);

// svc:process.env.Svc='http://107.180.102.80:8000',
