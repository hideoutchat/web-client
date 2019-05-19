const createActionReducers = () => ({
  NAME: (state, action) => ({ ...state, name: action.name })
});

export default createActionReducers;
