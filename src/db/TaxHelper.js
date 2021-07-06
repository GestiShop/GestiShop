import { Tax } from '../model/TaxModel'

const addTax = (tax, errorCallback, resultCallback) => {
    const dbTax = new Tax(tax)
    dbTax.save((err) => {
        if (err) {
            errorCallback(err)
        } else {
            resultCallback()
        }
    })
}

const fetchTaxes = (errorCallback, resultCallback) => {
    return Tax.find({}, (err, docs) => {
        if (err) {
            errorCallback(err)
        } else {
            resultCallback(docs)
        }
    })
}

export { addTax, fetchTaxes }
