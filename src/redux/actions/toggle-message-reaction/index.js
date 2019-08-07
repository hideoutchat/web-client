import addMessageReaction from '../add-message-reaction';
import sendTopicPacket from '../send-topic-packet';

const toggleMessageReaction = ({ emoji, message }) => (dispatch, getState) => {
  const {
    indexes: {
      resources: {
        by: {
          id: resourcesById,
          type: {
            reaction: reactions,
            self: [{
              relationships: {
                identity: self
              }
            }]
          }
        }
      }
    }
  } = getState();

  const reaction = reactions.find((it) => it.relationships.target.id === message.id && it.relationships.actor.id === self.id);

  if (reaction) {
    dispatch({ resource: { id: reaction.id }, type: 'DESTROY_RESOURCE' });
    sendTopicPacket({
      packet: {
        removeReaction: {
          emoji,
          message: message.id
        },
        type: 'removeReaction'
      },
      topic: resourcesById[message.id][0].relationships.topic
    })(dispatch, getState);
  } else {
    addMessageReaction({ emoji, message })(dispatch, getState);
  }
};

export default toggleMessageReaction;
