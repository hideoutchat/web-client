const createActionReducers = () => ({
  APPEND_MESSAGE: (state, action) => ({
    ...state,
    messages: {
      ...state.messages,
      byPeer: {
        ...state.messages.byPeer,
        [action.peerId]: [
          ...state.messages.byPeer[action.peerId],
          action.message
        ]
      }
    }
  }),

  APPEND_MESSAGE_LINE: (state, action) => ({
    ...state,
    messages: {
      ...state.messages,
      byPeer: {
        ...state.messages.byPeer,
        [action.peerId]: state.messages.byPeer[action.peerId].map((message) => {
          if (message.id === action.messageId) {
            return {
              ...message,
              lines: [
                ...message.lines,
                action.line
              ]
            };
          }
          return message;
        })
      }
    }
  }),

  NAME: (state, action) => ({
    ...state,
    self: {
      ...state.self,
      displayName: action.name
    }
  })
});

export default createActionReducers;
