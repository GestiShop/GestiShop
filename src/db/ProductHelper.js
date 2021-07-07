import { Product } from '../model/ProductModel'

const addProduct = (product, errorCallback, resultCallback) => {
    const dbProduct = new Product(product)
    dbProduct.save((err) => {
        if (err) {
            errorCallback(err)
        } else {
            resultCallback()
        }
    })
}

const fetchProducts = (errorCallback, resultCallback) => {
    return Product.find({}, (err, docs) => {
        if (err) {
            errorCallback(err)
        } else {
            resultCallback(docs)
        }
    })
}

export { addProduct, fetchProducts }
