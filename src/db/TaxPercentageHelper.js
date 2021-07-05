import { TaxPercentage } from '../model/TaxPercentageModel'

const addTaxPercentage = (taxPercentage, errorCallback, resultCallback) => {
    const dbTaxPercentage = new TaxPercentage(taxPercentage)
    dbTaxPercentage.save((err) => {
        if (err) {
            errorCallback(err)
        } else {
            resultCallback()
        }
    })
}

const fetchTaxPercentages = (errorCallback, resultCallback) => {
    return TaxPercentage.find({}, (err, docs) => {
        if (err) {
            errorCallback(err)
        } else {
            resultCallback(docs)
        }
    })
}

export { addTaxPercentage, fetchTaxPercentages }
