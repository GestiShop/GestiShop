import * as D from 'schemawax';
import { Types } from 'mongoose';

const objectIdDecoder = D.unknown.andThen(
  (objectId) => objectId as Types.ObjectId
);

export const taxDecoder = D.object({
  required: {
    reference: D.string,
    percentage: D.number,
  },
  optional: {
    _id: objectIdDecoder,
  },
}).andThen((decodedTax) => {
  return {
    id: decodedTax._id,
    reference: decodedTax.reference,
    percentage: decodedTax.percentage,
  };
});
