const generateName = () => 'dwindling pinecone';

const setName = ({ history, name }) => (dispatch, getState) => {
  const { indexes: { resources: indexes } } = getState();
  const resource = indexes.by.id[indexes.by.type.self[0].relationships.member.id][0];

  dispatch({
    resource: {
      ...resource,
      attributes: {
        ...resource.attributes,
        displayName: name || generateName()
      }
    },
    type: 'UPDATE_RESOURCE'
  });

  history.push('/welcome');
};

export default setName;
