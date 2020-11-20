import joinNetwork from '../join-network';
import setName from '../set-name';

export default () => (dispatch, getState) => {
  setName({ name: '' })(dispatch, getState);
  joinNetwork({ url: 'wss://cedar.hideout.chat:8975' })(dispatch, getState);
};
