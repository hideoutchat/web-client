const CREATE_RESOURCE = (state, action) => ({
  ...state,
  resources: [
    ...state.resources,
    action.resource
  ]
});

export default CREATE_RESOURCE;
