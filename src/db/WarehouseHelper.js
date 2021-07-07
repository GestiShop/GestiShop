import { Warehouse } from '../model/WarehouseModel'

const addWarehouse = (warehouse, errorCallback, resultCallback) => {
    const dbWarehouse = new Warehouse(warehouse)
    dbWarehouse.save((err) => {
        if (err) {
            errorCallback(err)
        } else {
            resultCallback()
        }
    })
}

const fetchWarehouses = (errorCallback, resultCallback) => {
    return Warehouse.find({}, (err, docs) => {
        if (err) {
            errorCallback(err)
        } else {
            resultCallback(docs)
        }
    })
}

export { addWarehouse, fetchWarehouses }
