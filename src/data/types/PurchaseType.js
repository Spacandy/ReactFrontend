import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
  GraphQLBoolean as BoolType,
} from 'graphql';

const PaymentMethodType = new ObjectType({
  name: 'PaymentMethod',
  fields: {
    storage_state: { type: StringType },
    errors: { type: new ListType(StringType) },
  },
});

const ResponseType = new ObjectType({
  name: 'PurchaseResponse',
  fields: {
    success: { type: BoolType },
    created_at: { type: StringType },
    error_code: { type: StringType },
    error_detial: { type: StringType },
    pending: { type: BoolType },
    cancelled: { type: BoolType },
    result_unknown: { type: BoolType },
  },
});

const PurchaseDataType = new ObjectType({
  name: 'PurchaseData',
  fields: {
    succeeded: { type: BoolType },
    amount: { type: IntType },
    transaction_type: { type: StringType },
    message: { type: StringType },
    email: { type: StringType },
    payment_method_added: { type: BoolType },
    retain_on_success: { type: BoolType },
    payment_method: { type: PaymentMethodType },
    response: { type: ResponseType },
  },
});

const PurchaseType = new ObjectType({
  name: 'Purchase',
  fields: {
    uid: { type: StringType },
    data: { type: PurchaseDataType },
    error: { type: StringType },
  },
});

export default PurchaseType;
