import { GraphQLSchema } from 'graphql'
import { QueryType } from './types/query.js'

const schema = new GraphQLSchema({
  query: QueryType,
  description: 'root query type',
})

export { schema }
