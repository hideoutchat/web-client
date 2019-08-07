// eslint-disable-next-line complexity
const onRemoveReactionEvent = (event) => (dispatch, getState) => {
  const { indexes: { resources: { by: { type: resourcesByType } } } } = getState();
  const reactions = resourcesByType.reaction || [];
  const sender = resourcesByType.identity.find((it) => it.relationships.publicKey.id === event.signingKeyId);

  for (const reaction of reactions) {
    const { attributes: { emoji }, id, relationships: { actor, target } } = reaction;

    if (actor.id === sender.id) {
      if (target.id === event.removeReaction.message) {
        if (emoji === event.removeReaction.emoji) {
          dispatch({ resource: { id }, type: 'DESTROY_RESOURCE' });
        }
      }
    }
  }
};

export default onRemoveReactionEvent;
