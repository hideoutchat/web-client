const visitTopic = ({ history, topic }) => (dispatch, getState) => {
  const { indexes: { resources: { by: resourcesBy } } } = getState();
  const unreadMessages = (resourcesBy.type.message || []).filter((it) => it.relationships.topic.id === topic.id && !it.attributes.viewedAt);

  for (const message of unreadMessages) {
    dispatch({
      resource: {
        ...message,
        attributes: {
          ...message.attributes,
          viewedAt: new Date().toISOString()
        }
      },
      type: 'UPDATE_RESOURCE'
    });
  }

  history.push(`/topics/${encodeURIComponent(topic.id)}`);
};

export default visitTopic;
