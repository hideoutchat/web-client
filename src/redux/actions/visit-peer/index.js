import { SHA3 } from 'sha3';

// eslint-disable-next-line no-magic-numbers
const generateTopicId = ({ peer, self }) => new SHA3(256).update('topic:').update([self.relationships.publicKey.id, peer.relationships.publicKey.id].sort().join(':')).digest('base64');

// eslint-disable-next-line no-magic-numbers
const generateTopicMembershipId = ({ member, topic }) => new SHA3(256).update(`topicMembership:${topic.id}:${member.id}`).digest('base64');

const visitPeer = ({ history, peer }) => (dispatch, getState) => {
  const { indexes: { resources } } = getState();
  const self = resources.by.id[resources.by.type.self[0].relationships.identity.id][0];

  const topic = {
    attributes: {
      displayName: `${peer.attributes.displayName} & Me`
    },
    id: generateTopicId({ peer, self }),
    relationships: {},
    type: 'topic'
  };

  dispatch({ resource: topic, type: 'CREATE_OR_UPDATE_RESOURCE' });

  dispatch({
    resource: {
      attributes: {},
      id: generateTopicMembershipId({ member: self, topic }),
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
      id: generateTopicMembershipId({ member: peer, topic }),
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
