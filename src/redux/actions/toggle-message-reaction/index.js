const toggleMessageReaction = ({ emoji, messageId, peerId }) => (dispatch, getState) => {
  const { reactions, self } = getState();

  if (reactions.some((it) => it.messageId === messageId && it.peerId === peerId && it.reactorId === self.id)) {
    dispatch({ emoji, messageId, peerId, reactorId: self.id, type: 'REMOVE_MESSAGE_REACTION' });
  } else {
    dispatch({ emoji, messageId, peerId, reactorId: self.id, type: 'ADD_MESSAGE_REACTION' });
  }
};

export default toggleMessageReaction;
