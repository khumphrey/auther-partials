import { combineReducers } from 'redux';
import users from './users';
import stories, { currentStory } from './stories';

export default combineReducers({ users, stories, currentStory });
