import { SHA3 } from 'sha3';

// eslint-disable-next-line no-magic-numbers
const generateTopicId = ({ peer, self }) => new SHA3(256).update('topic:').update([self.relationships.publicKey.id, peer.relationships.publicKey.id].sort().join(':')).digest('base64');

// eslint-disable-next-line no-magic-numbers
const generateTopicMembershipId = ({ member, topic }) => new SHA3(256).update(`topicMembership:${topic.id}:${member.id}`).digest('base64');

const initializeTopicForPeer = ({ peer, self }) => (dispatch) => {
  const topic = {
    attributes: {
      displayName: `${peer.attributes.displayName} & Me`,
      updatedAt: new Date().toISOString()
    },
    id: generateTopicId({ peer, self }),
    relationships: {},
    type: 'topic'
  };

  // FIXME: This is a hack until all topics truly have DH-negotiated symmetric keys.
  topic.relationships.symmetricKey = { id: topic.id, type: 'symmetricKey' };

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
};

export default initializeTopicForPeer;
