const setName = ({ history, name }) => (dispatch, getState) => {
  if (name) {
    const { indexes: { resources: indexes } } = getState();
    const resource = indexes.by.id[indexes.by.type.self[0].relationships.identity.id][0];

    dispatch({
      resource: {
        ...resource,
        attributes: {
          ...resource.attributes,
          displayName: name
        }
      },
      type: 'UPDATE_RESOURCE'
    });
  }

  if (history) {
    history.push('/welcome');
  }
};

export default setName;
