const readMessage = ({ message: { id } }) => (dispatch, getState) => {
  const message = getState().indexes.resources.by.id[id][0];

  if (message) {
    dispatch({
      resource: {
        ...message,
        attributes: {
          ...message.attributes,
          viewedAt: new Date().toISOString()
        }
      },
      type: 'UPDATE_RESOURCE'
    });
  }
};

export default readMessage;
