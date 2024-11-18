import { getEnv } from "../utils";

const ENV = getEnv();

const local = {
  ENV: "local",
  API_URL: "http://localhost:8000",
  BACKEND_URL: "http://localhost:8000",
  FIREBASE_CONFIG: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  },
  STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY_TEST,
};

const development = {
  ...local,

  ENV: "development",
  API_URL: "http://localhost:5000",
  BACKEND_URL: "http://localhost:8000",
};

const production = {
  ...development,

  ENV: "production",
  API_URL: "https://api.tedxcusat.in",
  BACKEND_URL: "https://api.tedxcusat.in",
  STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY_LIVE,
};

const configs = { local, development, production };

const currentConfig = configs[ENV];
const config = {
  ENV: currentConfig.ENV,
  API_URL: currentConfig.API_URL,
  FIREBASE_CONFIG: currentConfig.FIREBASE_CONFIG,
  BACKEND_URL: currentConfig.BACKEND_URL,
  APP_CHECK_KEY: process.env.REACT_APP_APP_CHECK_KEY,
  STRIPE_PUBLIC_KEY: currentConfig.STRIPE_PUBLIC_KEY,
  STRIPE_API_KEY: currentConfig.STRIPE_API_KEY,
};

export default config;
