'use strict'

const { graphqlAdonis, graphiqlAdonis } = require('apollo-server-adonis');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('../app/Schema/Book.graphql');
const resolvers = require('../app/Resolvers/Book.js');

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route');

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

Route.on('/').render('welcome');

Route.post('/graphql', graphqlAdonis({
  schema
}));

Route.get('/graphql', graphqlAdonis({
  schema
}));

Route.get(
  '/graphiql',
  graphiqlAdonis({
    endpointURL: '/graphql', // a POST endpoint that GraphiQL will make the actual requests to
    passHeader: `'x-xsrf-token': function () {
      function getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
          let [k, v] = el.split('=');
          cookie[k.trim()] = v;
        })
        return cookie[name];
      }
      return getCookie('XSRF-TOKEN');
    }()`
  }),
);
