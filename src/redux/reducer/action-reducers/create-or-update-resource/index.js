const CREATE_OR_UPDATE_RESOURCE = (state, action) => {
  const index = state.resources.findIndex((it) => action.resource.id === it.id);
  const resources = [...state.resources];
  if (index < 0) {
    resources.push(action.resource);
  } else {
    resources.splice(index, 1, action.resource);
  }
  return { ...state, resources };
};

export default CREATE_OR_UPDATE_RESOURCE;
