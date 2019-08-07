import generateId from '@hideoutchat/web-sdk/utilities/cryptography/generate-id';

const onAddMessageEvent = (event) => (dispatch, getState) => {
  const sender = getState().indexes.resources.by.type.identity.find((it) => it.relationships.publicKey.id === event.signingKeyId);
  const message = {
    attributes: {
      text: event.text.text,
      timestamp: event.text.timestamp
    },
    id: event.text.id || generateId(),
    relationships: {
      sender: {
        id: sender.id,
        type: 'identity'
      },
      topic: {
        id: event.text.topic,
        type: 'topic'
      }
    },
    type: 'message'
  };
  dispatch({ resource: message, type: 'CREATE_OR_UPDATE_RESOURCE' });
};

export default onAddMessageEvent;
