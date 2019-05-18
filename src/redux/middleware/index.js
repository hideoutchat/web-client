import logger from './logger';
import thunk from 'redux-thunk';

const createMiddleware = () => [thunk, logger];

export default createMiddleware;
