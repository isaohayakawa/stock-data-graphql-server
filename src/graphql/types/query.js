import {
    GraphQLObjectType,
    GraphQLString
  } from 'graphql'
  import { CompanyType } from './company.js'
  import { getCompanyData } from '../utils.js'
  
  const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    fields: {
      company: {
        type: CompanyType,
        args: { 
          ticker: {
            type: GraphQLString,
            description: 'Company ticker',
          }
        },
        resolve: (_, args) => {
          return getCompanyData(args.ticker)
        }
      }
    }
  })
  
  export {
    QueryType,
  }
  