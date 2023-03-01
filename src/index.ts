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

import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 3001

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const addresses = [{id: 1, value: 'Kolasa 52'}, {id: 2, value: 'Selitskaga 11'}]
const perserMiddleware = bodyParser({})
app.use(perserMiddleware)

app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString();
        res.send(products.find(p => p.title.indexOf(searchString) > -1))
    } else {
        res.send(products)
    }
})
app.post('/products', (req: Request, res: Response) => {
    const newProduct = {
        id: +(new Date()),
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)
})
app.get('/products/:id', (req: Request, res: Response) => {
    let product = products.find(t => t.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }

})
app.put('/products/:id', (req: Request, res: Response) => {
    let product = products.find(t => t.id === +req.params.id)
    if (product) {
        product.title = req.body.title
        res.send(product)
    } else {
        res.send(404)
    }

})
app.delete('/products/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.slice(i, 1)
            res.send(204)
            return;
        }
    }
    res.send(404)
})

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    let addresse = addresses.find(a => a.id === +req.params.id)
    if (addresse) {
        res.send(addresse)
    } else {
        res.send(404)
    }

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})