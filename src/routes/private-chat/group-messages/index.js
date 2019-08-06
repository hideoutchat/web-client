const groupMessages = (state, topic) => {
  const messages = (state.indexes.resources.by.type.message || []).filter((it) => it.relationships.topic.id === topic.id).sort((a, b) => a.attributes.timestamp.localeCompare(b.attributes.timestamp));

  // eslint-disable-next-line complexity
  return messages.reduce((a, nextMessage) => {
    if (a.previousMessage && nextMessage.relationships.sender.id === a.previousMessage.relationships.sender.id) {
      const previousMessage = a.messages[a.messages.length - 1];
      previousMessage.lines.push({
        id: nextMessage.id,
        isRead: Boolean(nextMessage.attributes.viewedAt),
        text: nextMessage.attributes.text,
        timestamp: nextMessage.attributes.timestamp
      });
      const reactions = (state.indexes.resources.by.type.reaction || []).filter((reaction) => reaction.relationships.message.id === nextMessage.id);

      if (reactions.length > 0) {
        for (const reaction of reactions) {
          previousMessage.reactions.push(reaction);
        }
      }
    } else {
      a.messages.push({
        id: nextMessage.id,
        lines: [{
          id: nextMessage.id,
          isRead: Boolean(nextMessage.attributes.viewedAt),
          text: nextMessage.attributes.text,
          timestamp: nextMessage.attributes.timestamp
        }],
        reactions: (state.indexes.resources.by.type.reaction || []).filter((reaction) => reaction.relationships.message.id === nextMessage.id),
        sender: state.indexes.resources.by.id[nextMessage.relationships.sender.id][0]
      });
    }
    a.previousMessage = nextMessage;
    return a;
  }, {
    messages: [],
    previousMessage: undefined
  }).messages;
};

export default groupMessages;
