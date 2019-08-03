import deriveDisplayName from '@hideoutchat/web-sdk/utilities/cryptography/derive-display-name';
import generateId from '@hideoutchat/web-sdk/utilities/cryptography/generate-id';
import generatePrivateKey from '@hideoutchat/web-sdk/utilities/cryptography/generate-private-key';
import toPublicKey from '@hideoutchat/web-sdk/utilities/cryptography/to-public-key';

const initialize = () => async (dispatch) => {
  const privateKey = {
    attributes: await generatePrivateKey(),
    id: generateId(),
    relationships: {},
    type: 'privateKey'
  };

  const publicKey = {
    attributes: toPublicKey(privateKey.attributes),
    id: privateKey.attributes.kid,
    relationships: {},
    type: 'publicKey'
  };

  const identity = {
    attributes: {
      displayName: deriveDisplayName(privateKey.id)
    },
    id: generateId(),
    relationships: {
      privateKey: {
        id: privateKey.id,
        type: privateKey.type
      },
      publicKey: {
        id: publicKey.id,
        type: publicKey.type
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
  dispatch({ resource: publicKey, type: 'CREATE_RESOURCE' });
  dispatch({ resource: identity, type: 'CREATE_RESOURCE' });
  dispatch({ resource: self, type: 'CREATE_OR_UPDATE_RESOURCE' });
};

export default initialize;
