const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
const NetworkConstructor = require('./orpheus/ping')
const reqTracker = require('./orpheus/trackResolver')
const port = 3500;
const app = express();

// allow cross-origin requests
app.use(cors());
const orpheus = ({ document, variables, operationName, result, context }) => {
  // lets get nesting depth
  // were going to grab the height of the tree we're traversing
  const runTimeResult = Date.now() - context.startTime;
  let nestingDepth = 0;
  let dataPoints = 0
  let resolverCounts = {};



  function calcNestingDepthAndDataPoints(data, h = 0) {
    if (h > nestingDepth) {
      nestingDepth = h
    }

    let keys = Object.keys(data)

    keys.forEach((element, idx) => {

      if (typeof data[element] === 'object') {
        if (element !== 'data') {
          // check resolver counts object for element

          if (resolverCounts[element] !== 'undefined') {
            resolverCounts[element] = 1;
          } else {
            resolverCounts[element] += 1;
          }

        }

        calcNestingDepthAndDataPoints(data[element], h + 1)
      } else {
        dataPoints += 1
      }
    })
  }
  calcNestingDepthAndDataPoints(result);


  return {
    runTime: runTimeResult,
    nestingDepth,
    dataPoints,
    resolverCounts,
  }
}

// when someone goes to below route, express will look and see that you want to interact with graphQL. the control of this request will be hand-offed to the middleware. (graphqlHTTP)
// need a schema to be created and passed into middleware function; to describe how the data on our graph will look
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // set this to be true so we can use graphiql on our local host
  pretty: false,
  context: { startTime: Date.now() },
  extensions: orpheus
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

app.listen(port, () => {
  console.log(`now listening for requests on port ${port}`)
});
