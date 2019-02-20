import { GraphQLServer } from 'graphql-yoga'
import * as mongoose from 'mongoose';
import { models } from './database/schema';
// import * as dotenv from 'dotenv';
import resolvers from './resolvers'

mongoose.connect('mongodb://0.0.0.0:27017/catapult',{ useNewUrlParser: true });
(<any>mongoose).Promise = global.Promise;

// Bind connection to error event (to get notification of connection errors)
mongoose.connection
  .once('open', () => console.log('Mongodb running'))
  .on('error', console.error.bind(console, 'MongoDB connection error:'));

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context:{
    models,
  }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))