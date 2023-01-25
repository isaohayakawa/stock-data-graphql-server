import express from 'express'
import dotEnv from 'dotenv'
import { graphqlHTTP } from 'express-graphql'

import { schema } from './graphql/schema.js'

dotEnv.config()

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Server Running!')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
