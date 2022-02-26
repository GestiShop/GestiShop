/* eslint-disable no-underscore-dangle */
import {
  Address,
  CalendarEvent,
  Category,
  FullProduct,
  Tax,
  UnitType,
  Warehouse,
} from '../types';

export const decodeAddress = (data: any): Address => {
  return {
    roadType: data.roadType,
    street: data.street,
    number: data.nuber,
    floor: data.floor,
    door: data.door,
    extra: data.extra,
    zipCode: data.zipCode,
    city: data.city,
    province: data.province,
    state: data.state,
    country: data.country,
  };
};

export const decodeCalendarEvent = (dbEvent: any): CalendarEvent => {
  return {
    id: dbEvent._id,
    start: dbEvent.start,
    end: dbEvent.end,
    title: dbEvent.title,
    description: dbEvent.description,
    allDay: dbEvent.allDay,
    colorCode: dbEvent.colorCode,
  };
};

export const decodeTax = (dbTax: any): Tax => {
  return {
    id: dbTax._id,
    reference: dbTax.reference,
    percentage: dbTax.percentage,
  };
};

export const decodeUnitType = (dbUnitType: any): UnitType => {
  return {
    id: dbUnitType._id,
    reference: dbUnitType.reference,
    unit: dbUnitType.unit,
  };
};

export const decodeWarehouse = (dbWarehouse: any): Warehouse => {
  return {
    id: dbWarehouse._id,
    reference: dbWarehouse.reference,
    description: dbWarehouse.description,
    address: decodeAddress(dbWarehouse.address),
  };
};

export const decodeCategory = (dbCategory: any): Category => {
  return {
    id: dbCategory._id,
    reference: dbCategory.reference,
    name: dbCategory.name,
    parent: dbCategory.parent,
  };
};

export const decodeFullProduct = (dbProduct: any): FullProduct => {
  return {
    id: dbProduct._id,
    reference: dbProduct.reference,
    name: dbProduct.name,
    description: dbProduct.description,
    buyingInfo: {
      basePrice: dbProduct.buyingInfo.basePrice,
      discountPercentage: dbProduct.buyingInfo.discountPercentage,
      taxPercentage: decodeTax(dbProduct.buyingInfo.taxPercentage),
    },
    sellingInfo: {
      basePrice: dbProduct.sellingInfo.basePrice,
      discountPercentage: dbProduct.sellingInfo.discountPercentage,
      taxPercentage: decodeTax(dbProduct.sellingInfo.taxPercentage),
    },
    unitType: decodeUnitType(dbProduct.unitType),
    stock: dbProduct.stock,
    warehouse: decodeWarehouse(dbProduct.warehouse),
    categories: dbProduct.categories.map((category: any) =>
      decodeCategory(category)
    ),
    minStock: dbProduct.minStock,
    stockAlert: dbProduct.stockAlert,
  };
};
