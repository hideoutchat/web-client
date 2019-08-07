const isRelated = (a, relationshipName, b) => {
  if (a.relationships[relationshipName].id === b.id) {
    if (a.relationships[relationshipName].type === b.type) {
      return true;
    }
  }
  return false;
};

const sendTopicPacket = ({ packet, topic }) => (dispatch, getState) => {
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

  for (const member of memberships) {
    if (isRelated(member, 'topic', topic) && !isRelated(member, 'identity', sender)) {
      const [recipient] = resourcesById[member.relationships.identity.id];
      const [{ attributes: publicKey }] = resourcesById[recipient.relationships.publicKey.id];

      sendPeerEvent(publicKey, packet);
    }
  }
};

export default sendTopicPacket;
