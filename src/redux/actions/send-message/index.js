import { Buffer } from 'buffer';

const ID_LENGTH = 32;

const sendMessage = ({ message, peerId }) => (dispatch, getState) => {
  const { messages: { byPeer: { [peerId]: messages } }, self } = getState();

  const latestMessage = messages[messages.length - 1];

  const line = {
    text: message.text,
    timestamp: new Date().toISOString()
  };

  if (latestMessage && latestMessage.sender === self) {
    dispatch({
      line,
      messageId: messages[messages.length - 1].id,
      peerId,
      type: 'APPEND_MESSAGE_LINE'
    });
  } else {
    dispatch({
      message: {
        id: Buffer.from(crypto.getRandomValues(new Uint8Array(ID_LENGTH))).toString('base64'),
        lines: [
          {
            text: message.text,
            timestamp: new Date().toISOString()
          }
        ],
        reactions: [],
        sender: self
      },
      peerId,
      type: 'APPEND_MESSAGE'
    });
  }
};

export default sendMessage;
