const addMessageReaction = ({ emoji, messageId, peerId }) => (dispatch, getState) => {
  const { self: { id: reactorId } } = getState();

  dispatch({ emoji, messageId, peerId, reactorId, type: 'ADD_MESSAGE_REACTION' });
};

export default addMessageReaction;
