const createActionReducers = () => ({
  ADD_MESSAGE_REACTION: (state, action) => ({
    ...state,
    messages: {
      ...state.messages,
      byPeer: {
        ...state.messages.byPeer,
        [action.peerId]: state.messages.byPeer[action.peerId].map((it) => {
          if (it.id === action.messageId) {
            if (it.reactions.some((it) => it.emoji === action.emoji)) {
              return {
                ...it,
                reactions: it.reactions.map((it) => {
                  if (it.emoji === action.emoji) {
                    return { ...it, count: it.count + 1 };
                  }
                  return it;
                })
              };
            }

            return {
              ...it,
              reactions: [
                ...it.reactions,
                {
                  count: 1,
                  emoji: action.emoji
                }
              ]
            };
          }

          return it;
        })
      }
    },
    reactions: [
      ...state.reactions,
      {
        messageId: action.messageId,
        peerId: action.peerId,
        reactorId: action.reactorId
      }
    ]
  }),

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
  }),

  REMOVE_MESSAGE: (state, action) => ({
    ...state,
    messages: {
      ...state.messages,
      byPeer: {
        ...state.messages.byPeer,
        [action.peerId]: state.messages.byPeer[action.peerId].filter((it) => it.id !== action.messageId)
      }
    }
  }),

  REMOVE_MESSAGE_REACTION: (state, action) => ({
    ...state,
    messages: {
      ...state.messages,
      byPeer: {
        ...state.messages.byPeer,
        [action.peerId]: state.messages.byPeer[action.peerId].map((message) => {
          if (message.id === action.messageId) {
            return {
              ...message,
              reactions: message.reactions.filter((reaction) => {
                if (reaction.emoji === action.emoji) {
                  if (reaction.count === 1) {
                    return undefined;
                  }
                  return {
                    ...reaction,
                    count: reaction.count - 1
                  };
                }
                return reaction;
              }).filter(Boolean)
            };
          }
          return message;
        })
      }
    },
    reactions: state.reactions.filter((it) => !(it.peerId === action.peerId && it.messageId === action.messageId && it.reactorId === action.reactorId))
  })
});

export default createActionReducers;
