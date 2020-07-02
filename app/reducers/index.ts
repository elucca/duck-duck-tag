import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import counter from './counter';
import configuration from './configuration'
import job from './job'
import imageId from './assignId'

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter,
    configuration,
    job,
    imageId
  });
}
