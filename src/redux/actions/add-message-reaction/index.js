import generateId from '@hideoutchat/web-sdk/utilities/cryptography/generate-id';
import sendTopicPacket from '../send-topic-packet';

const isValidTransition = (state, action) => !state.resources.some((it) => {
  if (it.type !== 'reaction') {
    return false;
  }

  if (it.relationships.actor.id !== action.actor.id) {
    return false;
  }

  if (it.relationships.target.id !== action.message.id) {
    return false;
  }

  if (it.attributes.emoji !== action.emoji) {
    return false;
  }

  return true;
});

const addMessageReaction = ({ actor, emoji, message }) => (dispatch, getState) => {
  const self = getState().indexes.resources.by.type.self[0].relationships.identity;
  const reactor = actor || self;

  if (isValidTransition(getState(), { actor: reactor, emoji, message })) {
    dispatch({
      resource: {
        attributes: {
          emoji
        },
        id: generateId(),
        relationships: {
          actor: {
            id: reactor.id,
            type: reactor.type
          },
          target: {
            id: message.id,
            type: 'message'
          }
        },
        type: 'reaction'
      },
      type: 'CREATE_RESOURCE'
    });

    if (reactor.id === self.id) {
      sendTopicPacket({
        packet: {
          addReaction: {
            emoji,
            message: message.id
          },
          type: 'addReaction'
        },
        topic: getState().indexes.resources.by.id[message.id][0].relationships.topic
      })(dispatch, getState);
    }
  }
};

export default addMessageReaction;
