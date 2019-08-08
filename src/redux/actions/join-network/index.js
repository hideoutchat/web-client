import generateId from '@hideoutchat/web-sdk/utilities/cryptography/generate-id';
import { hideout } from '@hideoutchat/web-sdk';
import initializeTopicForPeer from './initialize-topic-for-peer';
import onEvent from './events';

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
        const { indexes: { resources: { by: resourcesBy } } } = getState();
        const { id = generateId() } = resourcesBy.type.identity.find((it) => it.relationships.publicKey.id === event.signingKeyId) || {};
        const self = resourcesBy.id[resourcesBy.type.self[0].relationships.identity.id][0];
        const peer = {
          attributes: {
            displayName: event.displayName,
            isTrusted: true,
            lastSeenAt: new Date().toISOString()
          },
          id,
          relationships: {
            publicKey: {
              id: event.signingKeyId,
              type: 'publicKey'
            }
          },
          type: 'identity'
        };

        dispatch({ resource: peer, type: 'CREATE_OR_UPDATE_RESOURCE' });

        initializeTopicForPeer({ peer, self })(dispatch);
      });

      onPeerEvent((event) => onEvent(event)(dispatch, getState));

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
      getState().connection.broadcast('identity', self.attributes);
    },

    privateKey,

    url
  });
};

export default joinNetwork;
