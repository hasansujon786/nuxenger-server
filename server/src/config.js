export const {
  APP_PORT = 4000,
  NODE_ENV = 'development',
  MONGO_URI = 'mongodb://localhost/chat-app',

  SESS_NAME = 'sid',
  SESS_SECRET = 'secret!session',
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  REDIST_HOST = 'redis-11261.c8.us-east-1-2.ec2.cloud.redislabs.com',
  REDIST_PORT = 11261,
  REDIST_PASSWORD = 'VtZGX2udMq9zuDiUDijIg6MQtnZsRO0T'
} = process.env
