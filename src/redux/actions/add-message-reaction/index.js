import { Buffer } from 'buffer';

const ID_LENGTH = 32;

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

const addMessageReaction = ({ emoji, message }) => (dispatch, getState) => {
  const actor = getState().indexes.resources.by.type.self.relationships.member;

  if (isValidTransition(getState(), { actor, emoji, message })) {
    dispatch({
      resource: {
        attributes: {
          emoji
        },
        id: Buffer.from(crypto.getRandomValues(new Uint8Array(ID_LENGTH))).toString('base64'),
        relationships: {
          actor: {
            id: actor.id,
            type: actor.type
          },
          target: {
            id: message.id,
            type: message.type
          }
        },
        type: 'reaction'
      },
      type: 'CREATE_RESOURCE'
    });
  }
};

export default addMessageReaction;
