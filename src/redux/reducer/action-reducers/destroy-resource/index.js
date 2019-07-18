const DESTROY_RESOURCE = (state, action) => ({
  ...state,
  resources: state.resources.filter((it) => it.id !== action.resource.id)
});

export default DESTROY_RESOURCE;
