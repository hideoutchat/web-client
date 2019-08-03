import generateId from '@hideoutchat/web-sdk/utilities/cryptography/generate-id';
import { hideout } from '@hideoutchat/web-sdk';

const listResourcesByType = (type) => (state) => state.indexes.resources.by.type[type] || [];
const findResourceById = (id) => (state) => (state.indexes.resources.by.id[id] || [])[0];

const joinNetwork = ({ history, url }) => (dispatch, getState) => {
  const state = getState();
  const self = findResourceById(listResourcesByType('self')(state)[0].relationships.identity.id)(state);
  const { attributes: privateKey } = findResourceById(self.relationships.privateKey.id)(state);

  hideout(WebSocket).connect({
    onConnect: (connection) => {
      dispatch({ connection, type: 'CONNECT' });

      const { broadcast, onBroadcast, onPeerEvent } = connection;

      onBroadcast('identity', (event) => {
        dispatch({
          resource: {
            attributes: { ...event.identity },
            id: generateId(),
            relationships: {
              publicKey: {
                id: event.signingKeyId,
                type: 'publicKey'
              }
            },
            type: 'identity'
          },
          type: 'CREATE_OR_UPDATE_RESOURCE'
        });
      });

      onPeerEvent((event) => {
        if (event.type === 'text') {
          const message = {
            attributes: {
              text: event.text.text,
              timestamp: event.text.timestamp
            },
            id: event.text.id,
            relationships: {
              sender: {
                id: getState().indexes.resources.by.type.identity.find((it) => it.relationships.publicKey.id === event.signingKeyId).id,
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
        }
      });

      broadcast('identity', self.attributes);

      history.push('/network');
    },

    onDisconnect: () => {
      dispatch({ type: 'DISCONNECT' });
    },

    onError: () => {
      // TODO: Handle the given error.
    },

    onPublicKey: (publicKey) => {
      dispatch({
        resource: {
          attributes: { ...publicKey },
          id: publicKey.kid,
          relationships: {},
          type: 'publicKey'
        },
        type: 'CREATE_RESOURCE'
      });
    },

    privateKey,

    url
  });
};

export default joinNetwork;
