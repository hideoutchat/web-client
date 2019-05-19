const generateName = () => 'dwindling pinecone';

const setName = ({ history, name }) => (dispatch) => {
  dispatch({ name: name || generateName(), type: 'NAME' });
  history.push('/welcome');
};

export default setName;
