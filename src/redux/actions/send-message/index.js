import generateId from '@hideoutchat/web-sdk/utilities/cryptography/generate-id';
import sendTopicPacket from '../send-topic-packet';

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

  const message = {
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
  };

  sendTopicPacket({
    packet: {
      text: {
        id: message.id,
        text: message.attributes.text,
        timestamp: message.attributes.timestamp,
        topic: topic.id
      },
      type: 'text'
    },
    topic
  })(dispatch, getState);

  dispatch({ resource: message, type: 'CREATE_RESOURCE' });
};

export default sendMessage;
