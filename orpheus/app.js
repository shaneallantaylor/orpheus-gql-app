const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const NetworkConstructor = require('./orpheus/ping')
const reqTracker = require('./orpheus/trackResolver')

const app = express();

// allow cross-origin requests
app.use(cors());

// when someone goes to below route, express will look and see that you want to interact with graphQL. the control of this request will be hand-offed to the middleware. (graphqlHTTP)
// need a schema to be created and passed into middleware function; to describe how the data on our graph will look
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // set this to be true so we can use graphiql on our local host
  pretty: false,
  context: { shane: true },
  extensions: (function ({ document, variables, operationName, result, context }) {
    console.log('WE GOT AN EXTENSION');
    console.log('============== Document IS', document);
    // console.log('++++++++++++ Context is', context);

  })
}));

app.get('/resolvers', (req, res) => { res.json(resolverCounter) })

app.get('/requests', (req, res) => { res.json(reqTracker) })

app.get('/reset', (req, res) => {
  reqTracker.reset();
  res.json(reqTracker);
})

let resolverCounter = schema.resolverCounter;

let netStats = new NetworkConstructor()

// setInterval(function () {
//   // netStats.ping();
//   console.log('this is the resolver counter', reqTracker)
// }, 10000);

app.listen(3500, () => {
  console.log('now listening for requests on port 3500')
});
