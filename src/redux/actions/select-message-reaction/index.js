const selectMessageReaction = ({ history, message }) => () => {
  history.push('#!/dialogs/emoji', { messageId: message.id });
};

export default selectMessageReaction;
