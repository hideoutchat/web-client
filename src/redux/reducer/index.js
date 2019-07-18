import createActionReducers from './action-reducers';
import createIndexers from './indexers';

const createReducer = (initialState = {}) => {
  const ActionReducers = createActionReducers();
  const index = createIndexers();
  const indexedInitialState = index(initialState);

  return (state = indexedInitialState, action) => {
    const { [action.type]: reduce } = ActionReducers;

    if (typeof reduce === 'function') {
      return index(reduce(state, action));
    }

    return state;
  };
};

export default createReducer;
