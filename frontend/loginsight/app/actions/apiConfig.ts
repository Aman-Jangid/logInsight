const BACKEND_URL = process.env.NEXT_API_URL;

// if (!BACKEND_URL) {
//   throw new Error(
//     "NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables"
//   );
// }

const AUTH_URL = `${BACKEND_URL}/auth`;
const LOG_URL = `${BACKEND_URL}/logs`;

export { BACKEND_URL, AUTH_URL, LOG_URL };
