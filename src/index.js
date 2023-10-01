import { SyncUI } from './classes/SyncUi.js';
import { User } from './classes/User.js';

const user = new User();
const syncUI = new SyncUI(user);
syncUI.attachEventListeners();
syncUI.createScoreTracker();
syncUI.renderForm();
