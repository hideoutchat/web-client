import { hideout } from '@hideoutchat/web-sdk';

const listResourcesByType = (type) => (state) => state.indexes.resources.by.type[type] || [];
const findResourceById = (id) => (state) => (state.indexes.resources.by.id[id] || [])[0];

const joinNetwork = ({ history, url }) => (dispatch, getState) => {
  const state = getState();
  const { attributes: { displayName } } = findResourceById(listResourcesByType('self')(state)[0].relationships.identity.id)(state);
  const privateKey = listResourcesByType('privateKey')(state)[0].attributes;

  hideout(WebSocket).connect({
    onConnect: ({ broadcast, onBroadcast, onGroupEvent, onPeerEvent, sendGroupEvent, sendPeerEvent }) => {
      console.log('#onConnect()', broadcast, onBroadcast, onGroupEvent, onPeerEvent, sendGroupEvent, sendPeerEvent);

      dispatch({
        connection: { broadcast, sendGroupEvent, sendPeerEvent },
        type: 'CONNECT'
      });

      onBroadcast('identity', (event) => {
        console.log('#onBroadcast():identity', event);
        dispatch({
          resource: {
            attributes: {
              displayName: event.identity.displayName
            },
            id: event.signingKeyId,
            relationships: {},
            type: 'identity'
          },
          type: 'CREATE_OR_UPDATE_RESOURCE'
        });
      });

      onPeerEvent((event) => {
        console.log('#onPeerEvent()', event);
      });

      broadcast('identity', { displayName });

      history.push('/network');
    },

    onDisconnect: () => {
      console.log('#onDisconnect()');
      dispatch({ type: 'DISCONNECT' });
    },

    onError: (error) => {
      console.log('#onError()', error);
    },

    onPublicKey: (publicKey) => {
      console.log('#onPublicKey()', publicKey);
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
