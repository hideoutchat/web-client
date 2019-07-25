import generateId from '@hideoutchat/web-sdk/utilities/cryptography/generate-id';

const sendMessage = ({ text, topic }) => (dispatch, getState) => {
  const {
    indexes: {
      resources: {
        by: {
          type: {
            self: [{
              relationships: {
                identity: sender
              }
            }]
          }
        }
      }
    }
  } = getState();
  dispatch({
    resource: {
      attributes: {
        text,
        timestamp: new Date().toISOString()
      },
      id: generateId(),
      relationships: {
        sender: {
          id: sender.id,
          type: sender.type
        },
        topic: {
          id: topic.id,
          type: topic.type
        }
      },
      type: 'message'
    },
    type: 'CREATE_RESOURCE'
  });
};

export default sendMessage;
