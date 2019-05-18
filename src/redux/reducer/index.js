import createActionReducers from './action-reducers';

const createReducer = (initialState = {}) => {
  const ActionReducers = createActionReducers();

  return (state = initialState, action) => {
    const { [action.type]: reduce } = ActionReducers;

    if (typeof reduce === 'function') {
      return reduce(state, action);
    }

    return state;
  };
};

export default createReducer;
