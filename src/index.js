import 'dotenv/config';
import router from './routes';
import initializeServer from './Server';

const startServer = initializeServer(router);

export default startServer;
