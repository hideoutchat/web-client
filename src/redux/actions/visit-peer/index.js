import generateId from '@hideoutchat/web-sdk/utilities/cryptography/generate-id';

const visitPeer = ({ history, peer }) => (dispatch, getState) => {
  const { indexes: { resources } } = getState();
  const self = resources.by.id[resources.by.type.self[0].relationships.identity.id][0];

  const topic = {
    attributes: {
      displayName: `${peer.attributes.displayName} & Me`
    },
    id: generateId(),
    relationships: {},
    type: 'topic'
  };

  dispatch({ resource: topic, type: 'CREATE_OR_UPDATE_RESOURCE' });

  dispatch({
    resource: {
      attributes: {},
      id: generateId(),
      relationships: {
        identity: {
          id: self.id,
          type: self.type
        },
        topic: {
          id: topic.id,
          type: topic.type
        }
      },
      type: 'topicMembership'
    },
    type: 'CREATE_OR_UPDATE_RESOURCE'
  });

  dispatch({
    resource: {
      attributes: {},
      id: generateId(),
      relationships: {
        identity: {
          id: peer.id,
          type: peer.type
        },
        topic: {
          id: topic.id,
          type: topic.type
        }
      },
      type: 'topicMembership'
    },
    type: 'CREATE_OR_UPDATE_RESOURCE'
  });

  history.push(`/topics/${encodeURIComponent(topic.id)}`);
};

export default visitPeer;
