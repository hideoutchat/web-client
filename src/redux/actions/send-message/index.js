import generateId from '@hideoutchat/web-sdk/utilities/cryptography/generate-id';

const isRelated = (a, relationshipName, b) => {
  if (a.relationships[relationshipName].id === b.id) {
    if (a.relationships[relationshipName].type === b.type) {
      return true;
    }
  }
  return false;
};

const sendMessage = ({ text, topic }) => (dispatch, getState) => {
  const {
    connection: {
      sendPeerEvent
    },
    indexes: {
      resources: {
        by: {
          id: resourcesById,
          type: {
            self: [{
              relationships: {
                identity: sender
              }
            }],
            topicMembership: memberships
          }
        }
      }
    }
  } = getState();

  const message = {
    attributes: {
      text,
      timestamp: new Date().toISOString()
    },
    id: generateId(),
    relationships: {
      sender: {
        id: sender.id,
        type: sender.type
      },
      topic: {
        id: topic.id,
        type: topic.type
      }
    },
    type: 'message'
  };

  for (const member of memberships) {
    if (isRelated(member, 'topic', topic) && !isRelated(member, 'identity', sender)) {
      const [recipient] = resourcesById[member.relationships.identity.id];
      const [{ attributes: publicKey }] = resourcesById[recipient.relationships.publicKey.id];

      sendPeerEvent(publicKey, {
        text: {
          id: message.id,
          text: message.attributes.text,
          timestamp: message.attributes.timestamp,
          topic: topic.id
        },
        type: 'text'
      });
    }
  }

  dispatch({ resource: message, type: 'CREATE_RESOURCE' });
};

export default sendMessage;
