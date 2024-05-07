// create a utils logger 
import pino from "pino";

const logger = pino({
  level: 'debug',
  transport: {
    target: "pino-pretty",
  },
});


export default logger;