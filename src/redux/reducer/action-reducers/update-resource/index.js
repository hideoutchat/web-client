const UPDATE_RESOURCE = (state, action) => ({
  ...state,
  resources: state.resources.map((resource) => {
    if (resource.id === action.resource.id) {
      return {
        ...resource,
        ...action.resource
      };
    }
    return resource;
  })
});

export default UPDATE_RESOURCE;
