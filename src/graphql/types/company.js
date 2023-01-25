import {
    GraphQLObjectType,
    GraphQLString
  } from 'graphql'
  import { PriceHistoryType } from './priceHistory.js'
  import { getPriceHistory } from '../utils.js'
  
  const CompanyType = new GraphQLObjectType({
    name: 'Company',
    description: 'Company',
    fields: {
      name: {
        type: GraphQLString,
        description: 'Company name',
        resolve: (obj) => {
          return obj.longName
        },
      },
      ticker: {
        type: GraphQLString,
        description: 'Company ticker',
        resolve: (obj) => {
          return obj.symbol
        },
      },
      priceHistory: {
        type: PriceHistoryType,
        description: '1 year daily price history',
        resolve: (obj) => {
          return getPriceHistory(obj.symbol)
        },
      },
    },
  })
  
  export {
    CompanyType,
  }
  