import { 
  GraphQLObjectType as ObjectType, 
  GraphQLInt as IntType, 
  GraphQLString as StringType 
} from 'graphql';

const PhotoUploadType = new ObjectType({
  name: 'PhotoUpload',
  fields: {
    id: { type: IntType },
    url: { type: StringType },
  }
});

export default PhotoUploadType;
