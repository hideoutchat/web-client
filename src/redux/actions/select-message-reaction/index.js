const selectMessageReaction = ({ history, messageId, peerId }) => () => {
  history.push('#!/dialogs/emoji', { messageId, peerId });
};

export default selectMessageReaction;
