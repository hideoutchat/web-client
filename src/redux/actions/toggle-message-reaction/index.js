const toggleMessageReaction = ({ emoji, message }) => (dispatch, getState) => {
  const {
    indexes: {
      resources: {
        by: {
          type: {
            reaction: reactions,
            self: [{
              relationships: {
                identity: self
              }
            }]
          }
        }
      }
    }
  } = getState();

  if (reactions.some((it) => it.relationships.message.id === message.id && it.relationships.reactor.id === self.id)) {
    dispatch({ emoji, message, reactor: self, type: 'DESTROY_RESOURCE' });
  } else {
    dispatch({ emoji, message, reactor: self, type: 'CREATE_RESOURCE' });
  }
};

export default toggleMessageReaction;
