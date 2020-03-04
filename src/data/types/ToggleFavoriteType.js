// class ToggleFavorite(graphene.Mutation):
//     class Input:
//         eventId = graphene.Int()
//
//     id = graphene.Int()
//     isFavorite = graphene.Boolean()
//
//     def mutate(self, args, context, info):
//         eventId = args.get('eventId')
//         event = Event.objects.get(id=eventId)
//
//         if event not in context.user.favorites.all():
//             context.user.favorites.add(event)
//             return ToggleFavorite(id=event.id, isFavorite=True)
//         else:
//             context.user.favorites.remove(event)
//             return ToggleFavorite(id=event.id, isFavorite=False)

import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLBoolean as BoolType,
  GraphQLNonNull as NonNull,
} from 'graphql';

const ToggleFavoriteType = new ObjectType({
  name: 'ToggleFavorite',
  fields: {
    id: { type: ID },
    isFavorite: { type: BoolType },
  },
});

export default ToggleFavoriteType;
