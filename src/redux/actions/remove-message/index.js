const removeMessage = ({ message, peerId }) => (dispatch) => {
  dispatch({ messageId: message.id, peerId, type: 'REMOVE_MESSAGE' });
};

export default removeMessage;
