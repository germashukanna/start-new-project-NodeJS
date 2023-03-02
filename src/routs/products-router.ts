import {Request, Response, Router} from "express";
import {body, validationResult} from "express-validator";
import {productsRepository} from "../ropositories/products-repository";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


export const productsRouter = Router({})

const validationChain = body('title').trim().isLength({min: 3, max: 10}).withMessage('Errors');

productsRouter.get('/', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
})

productsRouter.post('/',
    validationChain,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
        const newProduct = productsRepository.createProducts(req.body.title)
        res.status(201).send(newProduct)
    })
productsRouter.get('/:id', (req: Request, res: Response) => {
    let product = productsRepository.getProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }

})
productsRouter.put('/:id',
    validationChain,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    let isUpdated = productsRepository.updateProducts(+req.params.id, req.body.title)
    if (isUpdated) {
        const product = productsRepository.getProductById(+req.params.id)
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProducts(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})