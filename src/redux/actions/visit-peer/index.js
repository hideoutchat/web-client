const visitPeer = ({ history, peer }) => (dispatch, getState) => {
  const { indexes: { resources } } = getState();
  const self = resources.by.id[resources.by.type.self[0].relationships.member.id][0];

  const topic = {
    attributes: {
      displayName: `${peer.attributes.displayName} & Me`
    },
    id: [self.id, peer.id].join(','),
    relationships: {},
    type: 'topic'
  };

  dispatch({ resource: topic, type: 'CREATE_RESOURCE' });

  dispatch({
    resource: {
      attributes: {},
      id: [topic.id, self.id].join(','),
      relationships: {
        member: {
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
    type: 'CREATE_RESOURCE'
  });

  dispatch({
    resource: {
      attributes: {},
      id: [topic.id, peer.id].join(','),
      relationships: {
        member: {
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
    type: 'CREATE_RESOURCE'
  });

  history.push(`/topics/${encodeURIComponent(topic.id)}`);
};

export default visitPeer;
