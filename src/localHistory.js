/**
 *              ___             _   _  _ _
 *             | __|_ _____ _ _| |_| || (_)
 * Property of:| _|\ V / -_) ' \  _| __ | |
 *             |___|\_/\___|_||_\__|_||_|_|
 *
 */

import createBrowserHistory from 'history/createBrowserHistory';
import { createPath } from 'history/PathUtils';
// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history

const x = createPath;
export { x as createPath };

export default process.env.BROWSER && createBrowserHistory();
