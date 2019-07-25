const visitPeer = ({ history, peer }) => (dispatch, getState) => {
  const { indexes: { resources } } = getState();
  const self = resources.by.id[resources.by.type.self[0].relationships.identity.id][0];

  const topic = {
    attributes: {
      displayName: `${peer.attributes.displayName} & Me`
    },
    id: [self.id, peer.id].join(','),
    relationships: {},
    type: 'topic'
  };

  dispatch({ resource: topic, type: 'CREATE_OR_UPDATE_RESOURCE' });

  dispatch({
    resource: {
      attributes: {},
      id: [topic.id, self.id].join(','),
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
      id: [topic.id, peer.id].join(','),
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
