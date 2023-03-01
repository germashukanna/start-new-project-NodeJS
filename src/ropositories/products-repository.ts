const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepository = {
    findProducts(title: string | null | undefined) {
        if (title) {
            let foundProducts = products.find(p => p.title.indexOf(title) > -1)
            return foundProducts
        } else {
            return products
        }
    },
    getProductById(id: number) {
        let product = products.find(t => t.id === id)
        return product
    },
    createProducts(title: string) {
        const newProduct = {
            id: +(new Date()),
            title: title
        }
        products.push(newProduct)
        return newProduct
    },
    updateProducts(id: number, title: string) {
        let product = products.find(t => t.id === id)
        if (product) {
            product.title = title
            return true;
        } else {
            return false;
        }
    },
    deleteProducts(id: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true;
            }
        }
        return false;
    },
}