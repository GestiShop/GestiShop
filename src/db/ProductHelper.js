import { Product } from '../model/ProductModel'

const addProduct = (product, errorCallback) => {
    const dbProduct = new Product(product)
    dbProduct.save((err) => {
        if (err) {
            errorCallback(err)
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
