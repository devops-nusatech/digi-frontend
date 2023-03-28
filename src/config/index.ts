const USE_SSL = false;
const BASE_URL = '139.180.130.141:3001';

export const API_URL = USE_SSL ? `https://${BASE_URL}` : `http://${BASE_URL}`;
export const SOCKET_URL = USE_SSL ? `wss://${BASE_URL}` : `ws://${BASE_URL}`;
