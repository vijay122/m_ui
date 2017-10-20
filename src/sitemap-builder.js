import Sitemap from 'react-router-sitemap';
const router = require('./routes');

import { createRoutes } from 'react-router';
		const routes = createRoutes(router);
console.log("Routes:");

import { sitemapBuilder as buildSitemap } from 'react-router-sitemap';
import { paramsApplier as applyParams } from 'react-router-sitemap';

let paths = ['/', 'home/:param', '/contacts'];
const hostname = 'http://www.livelytrips.com';

const urllists = buildSitemap(hostname, paths);
//console.log(JSON.stringify(sitemap));

const config = {
  '/home:param': [
    { param: 'a' },
    { param: [ 'b', 'c' ] },
  ],
};

 let path = applyParams(paths, config);
console.log(JSON.stringify(path));

//const sitemap =  new Sitemap(router).build('http://www.livelytrips.com',paths).save("./sitemap.xml");

//export default sitemap;