import { Buffer } from 'buffer';

const ID_LENGTH = 32;

const sendMessage = ({ text, topic }) => (dispatch, getState) => {
  const {
    indexes: {
      resources: {
        by: {
          type: {
            self: [{
              relationships: {
                member: sender
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
      id: Buffer.from(crypto.getRandomValues(new Uint8Array(ID_LENGTH))).toString('base64'),
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
