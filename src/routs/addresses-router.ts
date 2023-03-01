import {Request, Response, Router} from "express";

const addresses = [{id: 1, value: 'Kolasa 52'}, {id: 2, value: 'Selitskaga 11'}]

export const addressesRouter = Router({})

addressesRouter.get('/', (req: Request, res: Response) => {
    res.send(addresses)
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    let addresse = addresses.find(a => a.id === +req.params.id)
    if (addresse) {
        res.send(addresse)
    } else {
        res.send(404)
    }

})