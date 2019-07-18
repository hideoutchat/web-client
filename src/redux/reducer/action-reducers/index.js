import CREATE_RESOURCE from './create-resource';
import DESTROY_RESOURCE from './destroy-resource';
import UPDATE_RESOURCE from './update-resource';

const createActionReducers = () => ({
  CREATE_RESOURCE,
  DESTROY_RESOURCE,
  UPDATE_RESOURCE
});

export default createActionReducers;
