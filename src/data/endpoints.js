import { isRelease } from 'settings';

const localhost = 'http://localhost';

const pickAPIEndpoint = endpoint => {
  if (isRelease) return process.env.API_BE_URL;
  return localhost;
};

const pickMediaEndpoint = () => {
  if (isRelease) return '';
  return localhost;
};

const renderMessages = endpointSelection => {
  console.info(`Using API endpoint: ${endpointSelection}`);
  return endpointSelection;
};

export const apiEndpoint = pickAPIEndpoint();
export const achEndpoint = process.env.API_FORTE_URL;
export const mediaEndpoint = pickMediaEndpoint();

const selectedEndpoint = renderMessages(apiEndpoint);

export default selectedEndpoint;
