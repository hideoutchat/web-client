import addMessageReaction from '/redux/actions/add-message-reaction';

const onAddReactionEvent = (event) => (dispatch, getState) => {
  const sender = getState().indexes.resources.by.type.identity.find((it) => it.relationships.publicKey.id === event.signingKeyId);

  addMessageReaction({
    actor: { id: sender.id },
    emoji: event.addReaction.emoji,
    message: { id: event.addReaction.message }
  })(dispatch, getState);
};

export default onAddReactionEvent;
