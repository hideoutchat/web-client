import addReaction from './add-reaction';
import removeReaction from './remove-reaction';
import text from './add-message';

const EventType = {
  addReaction,
  removeReaction,
  text
};

const onEvent = (event) => (dispatch, getState) => {
  const delegate = EventType[event.type];

  if (delegate) {
    delegate(event)(dispatch, getState);
  }
};

export default onEvent;
