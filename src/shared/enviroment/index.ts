/**
 * Build enviroment
 */
const getEnvVar = (key: string) => {
  if (process.env[key] === undefined) {
    throw new Error(`Env variable ${key} is required`);
  }
  return process.env[key] || '';
};

// const API_URL = getEnvVar('REACT_APP_API_URL');

const NODE_ENV = getEnvVar('NODE_ENV');

const enviroment = {
  // apiUrl: API_URL,
  development: NODE_ENV != 'production'
};

export { enviroment };
