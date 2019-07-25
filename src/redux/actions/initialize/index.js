import deriveDisplayName from '@hideoutchat/web-sdk/utilities/cryptography/derive-display-name';
import generateId from '@hideoutchat/web-sdk/utilities/cryptography/generate-id';
import generatePrivateKey from '@hideoutchat/web-sdk/utilities/cryptography/generate-private-key';

const initialize = () => async (dispatch) => {
  const privateKey = {
    attributes: await generatePrivateKey(),
    relationships: {},
    type: 'privateKey'
  };

  privateKey.id = privateKey.attributes.kid;

  const identity = {
    attributes: {
      displayName: deriveDisplayName(privateKey.id)
    },
    id: generateId(),
    relationships: {
      privateKey: {
        id: privateKey.id,
        type: privateKey.type
      }
    },
    type: 'identity'
  };

  const self = {
    attributes: {},
    id: 'self',
    relationships: {
      identity: {
        id: identity.id,
        type: identity.type
      }
    },
    type: 'self'
  };

  dispatch({ resource: privateKey, type: 'CREATE_RESOURCE' });
  dispatch({ resource: identity, type: 'CREATE_RESOURCE' });
  dispatch({ resource: self, type: 'CREATE_OR_UPDATE_RESOURCE' });
};

export default initialize;
