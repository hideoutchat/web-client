const removeMessage = ({ messageIds }) => (dispatch) => {
  for (const id of messageIds) {
    dispatch({ resource: { id }, type: 'DESTROY_RESOURCE' });
  }
};

export default removeMessage;
