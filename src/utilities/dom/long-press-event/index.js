const DEFAULT_TIMEOUT = 500;

const STOP_ON = Object.freeze(['mousemove', 'mouseout', 'mouseup', 'mousewheel', 'scroll', 'touchcancel', 'touchend', 'touchmove', 'wheel']);
const START_ON = Object.freeze(['mousedown', 'touchstart']);

const attachEvents = (target, timer) => {
  for (const eventType of STOP_ON) {
    target.addEventListener(eventType, timer.stop, false);
  }

  for (const eventType of START_ON) {
    target.addEventListener(eventType, timer.start, false);
  }

  return () => {
    for (const eventType of STOP_ON) {
      target.removeEventListener(eventType, timer.stop, false);
    }

    for (const eventType of START_ON) {
      target.removeEventListener(eventType, timer.start, false);
    }
  };
};

const Timer = function Timer(onTick, options = {}) {
  const state = {};

  this.stop = () => {
    if (state.timeout) {
      clearTimeout(state.timeout);
      delete state.timeout;
    }
  };

  this.start = (event) => {
    const { x, y } = event;
    if (!state.timeout) {
      state.timeout = setTimeout(() => onTick({ x, y }), options.timeout || DEFAULT_TIMEOUT);
    }
  };

  return this;
};

const addLongPressEventHandler = (target, onLongPress, options = {}) => {
  if (!target || !onLongPress) {
    return () => true;
  }

  const timer = new Timer(onLongPress, options);

  const detachEvents = attachEvents(target, timer);

  return () => {
    timer.stop();
    detachEvents();
  };
};

export default addLongPressEventHandler;
