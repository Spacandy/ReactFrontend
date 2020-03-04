import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from "graphql";

const CategoryType = new ObjectType({
  name: "Category",
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: StringType }
  }
});

export default CategoryType;
