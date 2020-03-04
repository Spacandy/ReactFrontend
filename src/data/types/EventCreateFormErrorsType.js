import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as ListType,
} from 'graphql';

const EventCreateFormErrorsType = new ObjectType({
  name: 'EventCreateFormErrors',
  fields: {
    general: {
      type: new ObjectType({
        name: 'GeneralSectionFormErrors',
        fields: {
          non_field_errors: { type: new ListType(StringType) },
          title: { type: new ListType(StringType) },
          hostname: { type: new ListType(StringType) },
          contactEmail: { type: new ListType(StringType) },
          description: { type: new ListType(StringType) },
          content_type: { type: new ListType(StringType) },
          cannabisConsumption: { type: new ListType(StringType) },
        },
      }),
    },
    when: {
      type: new ObjectType({
        name: 'WhenSectionFormErrors',
        fields: {
          non_field_errors: { type: new ListType(StringType) },
          list: {
            type: new ListType(
              new ObjectType({
                fields: {
                  date: { type: String },
                  start_time: { type: String },
                  end_time: { type: String },
                  non_field_errors: { type: new ListType(StringType) },
                },
                non_field_errors: { type: new ListType(StringType) },
              }),
            ),
          },
        },
      }),
    },
    where: {
      type: new ObjectType({
        name: 'WhereSectionFormErrors',
        fields: {
          non_field_errors: { type: new ListType(StringType) },
          locationType: { type: new ListType(StringType) },
          addressCountry: { type: new ListType(StringType) },
          postalCode: { type: new ListType(StringType) },
          streetAddress: { type: new ListType(StringType) },
          addressLocality: { type: new ListType(StringType) },
          addressRegion: { type: new ListType(StringType) },
        },
      }),
    },
    media: {
      type: new ObjectType({
        name: 'MediaSectionFormErrors',
        fields: {
          non_field_errors: { type: new ListType(StringType) },
        },
      }),
    },
    tickets: {
      type: new ObjectType({
        name: 'TicketsSectionFormErrors',
        fields: {
          non_field_errors: { type: new ListType(StringType) },
          list: {
            type: new ListType(
              new ObjectType({
                name: 'TicketErrors',
                fields: {
                  non_field_errors: { type: new ListType(StringType) },
                  name: { type: new ListType(StringType) },
                  description: { type: new ListType(StringType) },
                  price: { type: new ListType(StringType) },
                  fee_type: { type: new ListType(StringType) },
                  quantity: { type: new ListType(StringType) },
                  sale_end_date: { type: new ListType(StringType) },
                  max_per_order: { type: new ListType(StringType) },
                  sale_start_date: { type: new ListType(StringType) },
                  show_quantity: { type: new ListType(StringType) },
                },
              }),
            ),
          },
        },
      }),
    },
    promote: {
      type: new ObjectType({
        name: 'PromoteSectionFormErrors',
        fields: {
          non_field_errors: { type: new ListType(StringType) },
          categories: { type: new ListType(StringType) },
          private: { type: new ListType(StringType) },
        },
      }),
    },
    refunds: {
      type: new ObjectType({
        name: 'RefundsSectionFormErrors',
        fields: {
          non_field_errors: { type: new ListType(StringType) },
          refunds_policy: { type: new ListType(StringType) },
        },
      }),
    },
  },
});

export default EventCreateFormErrorsType;
