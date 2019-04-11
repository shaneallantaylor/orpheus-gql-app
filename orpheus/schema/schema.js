const graphql = require('graphql');
const graphqlDate = require('graphql-iso-date')
const _ = require('lodash');
const reqTracker = require('../orpheus/trackResolver');
const pool = require('../model/database');

// 3 current responsibilities - define types, define relationship between types, and define route queries

// describe the object types in the schema; schema here defines the graph and the object types on the graph

// desctructure Graph QL Object Type - grab this function from the graphql package, so we can store and use it inside this file
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const {
  GraphQLDate
} = graphqlDate;

const SpacecraftType = new GraphQLObjectType({
  name: 'spacecraft',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    launch_date: { type: GraphQLDate },
    country: {
      type: CountryType,
      resolve(parent, args) {
        reqTracker.pgPre(parent, args);
        reqTracker.addEntry('country');
        // console.log('country in spacecraft def', [parent._id]);
        return pool
          .query('SELECT * FROM country WHERE _id = $1;', [parent._id])
          .then(data => {
            reqTracker.pgPost(parent, args, 'country');
            return data.rows[0];
          })
          .catch(e => console.log(`error: ${e}`));
      }
    },
    agency: {
      type: AgencyType,
      resolve(parent, args) {
        reqTracker.pgPre(parent, args);
        reqTracker.addEntry('agency');
        console.log('agency in spacecraft def', parent._id);
        return pool
          .query('SELECT * FROM agency WHERE _id = $1;', [parent._id])
          .then(data => {
            reqTracker.pgPost(parent, args, 'agency');
            return data.rows[0];
          })
          .catch(e => console.log(`error: ${e}`));
      }
    },
    planet: {
      type: PlanetType,
      resolve(parent, args) {
        reqTracker.pgPre(parent, args);
        reqTracker.addEntry('planet');
        console.log('planet in spacecraft def', [parent._id]);
        return pool
          .query('SELECT * FROM planet WHERE _id = $1;', [parent._id])
          .then(data => {
            reqTracker.pgPost(parent, args, 'planet');
            return data.rows[0];
          })
          .catch(e => console.log(`error: ${e}`));
      }
    },
    mission_type: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    engine: {
      type: EngineType,
      resolve(parent, args) {
        reqTracker.pgPre(parent, args);
        reqTracker.addEntry('engine');
        console.log('engine in spacecraft def', [parent._id]);
        return pool
          .query('SELECT * FROM engine WHERE _id = $1;', [parent._id])
          .then(data => {
            reqTracker.pgPost(parent, args, 'engine');
            return data.rows[0];
          })
          .catch(e => console.log(`error: ${e}`));
      }
    }
  })
});

const AgencyType = new GraphQLObjectType({
  name: 'agency',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    country: {
      type: CountryType,
      resolve(parent, args) {
        reqTracker.pgPre(parent, args);
        reqTracker.addEntry('country');
        console.log('country in agency def', [parent._id]);
        return pool
          .query('SELECT * FROM country WHERE _id = $1;', [parent._id])
          .then(data => {
            reqTracker.pgPost(parent, args, 'agency');
            return data.rows[0];
          })
          .catch(e => console.log(`error: ${e}`));
      }
    }
  })
});

const CountryType = new GraphQLObjectType({
  name: 'country',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

const PlanetType = new GraphQLObjectType({
  name: 'planet',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString }
  })
});

const EngineType = new GraphQLObjectType({
  name: 'engine',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
});

// how we describe how a user can initially jump into the graph and grab data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // don't need to wrap in a function because we don't need to worry about the order
    spacecraft: {
      type: SpacecraftType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        reqTracker.pgPre(parent, args);
        reqTracker.addEntry('spacecraft');
        // console.log('spacecraft in root', parseInt(args._id));
        return pool
          .query('SELECT * FROM spacecraft WHERE _id = $1;', [parseInt(args._id)])
          .then(data => {
            reqTracker.pgPost(parent, args, 'spacecraft');
            return data.rows[0];
          })
          .catch(e => console.log(`error: ${e}`));
      }
    },
    agency: {
      type: AgencyType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        reqTracker.pgPre(parent, args);
        reqTracker.addEntry('agency');
        // console.log('agency in root', parseInt(args._id));
        return pool
          .query('SELECT * FROM agency WHERE _id = $1;', [parseInt(args._id)])
          .then(data => {
            reqTracker.pgPost(parent, args, 'agency');
            return data.rows[0];
          })
          .catch(e => console.log(`error: ${e}`));
      }
    },
    country: {
      type: CountryType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        reqTracker.pgPre(parent, args);
        reqTracker.addEntry('country');
        console.log('country in root', parseInt(args._id));
        return pool
          .query('SELECT * FROM country WHERE _id = $1;', [parseInt(args._id)])
          .then(data => {
            reqTracker.pgPost(parent, args, 'country');
            return data.rows[0];
          })
          .catch(e => console.log(`error: ${e}`));
      }
    },
    planet: {
      type: PlanetType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        reqTracker.pgPre(parent, args);
        reqTracker.addEntry('planet');
        console.log('planet in root', parseInt(args._id));
        return pool
          .query('SELECT * FROM planet WHERE _id = $1;', [parseInt(args._id)])
          .then(data => {
            reqTracker.pgPost(parent, args, 'planet');
            return data.rows[0];
          })
          .catch(e => console.log(`error: ${e}`));
      }
    },
    engine: {
      type: EngineType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        reqTracker.pgPre(parent, args);
        reqTracker.addEntry('engine');
        console.log('engine in root', parseInt(args._id));
        return pool
          .query('SELECT * FROM engine WHERE _id = $1;', [parseInt(args._id)])
          .then(data => {
            reqTracker.pgPost(parent, args, 'engine');
            return data.rows[0];
          })
          .catch(e => console.log(`error: ${e}`));
      }
    }
  }
});

// Mutations are what allows us to make mutate/change/update the data. In graphql we need to explicitly define our mutations; to say what data can be changed, added, deleted, etc.

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSpacecraft: {
      type: SpacecraftType,
      // args: {
      //   name: {type: new GraphQLNonNull(GraphQLString)},
      //   age: {type: new GraphQLNonNull(GraphQLInt)}
      // },
      // resolve(parent, args){
      //   let author = new Author({
      //     name: args.name,
      //     age: args.age
      //   });
      //   return author.save();
      // }
    },
    addAgency: {
      type: AgencyType,
      // args: {
      //   name: {type: new GraphQLNonNull(GraphQLString)},
      //   genre: {type: new GraphQLNonNull(GraphQLString)},
      //   authorId: {type: new GraphQLNonNull(GraphQLID)}
      // },
      // resolve(parent, args){
      //   let book = new Book({
      //     name: args.name,
      //     genre: args.genre,
      //     authorId: args.authorId
      //   });
      //   return book.save();
      // }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})