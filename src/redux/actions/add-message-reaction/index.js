const addMessageReaction = ({ emoji, messageId, peerId }) => (dispatch, getState) => {
  const { reactions, self: { id: reactorId } } = getState();

  if (!reactions.some((it) => it.reactorId === reactorId && it.emoji === emoji && it.messageId === messageId && it.peerId === peerId)) {
    dispatch({ emoji, messageId, peerId, reactorId, type: 'ADD_MESSAGE_REACTION' });
  }
};

export default addMessageReaction;
