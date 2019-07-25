import generateId from '@hideoutchat/web-sdk/utilities/cryptography/generate-id';

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
  const actor = getState().indexes.resources.by.type.self.relationships.identity;

  if (isValidTransition(getState(), { actor, emoji, message })) {
    dispatch({
      resource: {
        attributes: {
          emoji
        },
        id: generateId(),
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
