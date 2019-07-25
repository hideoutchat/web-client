import CONNECT from './connect';
import CREATE_OR_UPDATE_RESOURCE from './create-or-update-resource';
import CREATE_RESOURCE from './create-resource';
import DESTROY_RESOURCE from './destroy-resource';
import DISCONNECT from './disconnect';
import UPDATE_RESOURCE from './update-resource';

const createActionReducers = () => ({
  CONNECT,
  CREATE_OR_UPDATE_RESOURCE,
  CREATE_RESOURCE,
  DESTROY_RESOURCE,
  DISCONNECT,
  UPDATE_RESOURCE
});

export default createActionReducers;
