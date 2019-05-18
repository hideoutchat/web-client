const setName = (name) => (dispatch) => {
  dispatch({ name, type: 'NAME' });
};

export default setName;
