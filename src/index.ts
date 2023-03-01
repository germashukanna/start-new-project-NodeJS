//  -------01 - Simple express app with typescript and nodemon------
//
// import express, {Request, Response} from 'express'
//
// const app = express()
// const port = process.env.PORT || 3000
//
// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello 555!')
// })
//
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

// -------03 - 1 - Express and REST API-------

import express from 'express'
import bodyParser from 'body-parser'
import {productsRouter} from "./routs/products-router";
import {addressesRouter} from "./routs/addresses-router";

const app = express()
const port = process.env.PORT || 3001



const perserMiddleware = bodyParser({})
app.use(perserMiddleware)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})