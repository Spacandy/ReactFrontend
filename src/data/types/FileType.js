import {
  GraphQLInputObjectType as InputObjectType,
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql';

const FileType = new InputObjectType({
  name: 'File',
  fields: {
    name: { type: new NonNull(StringType) },
    type: { type: new NonNull(StringType) },
    size: { type: new NonNull(IntType) },
    path: { type: new NonNull(StringType) }
  }
});

export default FileType;
