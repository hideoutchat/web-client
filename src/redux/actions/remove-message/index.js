const removeMessage = ({ message }) => (dispatch) => {
  dispatch({ message, type: 'REMOVE_MESSAGE' });
};

export default removeMessage;
