const cron = require('node-cron');

cron.schedule('0 0 1 * *', () => {
  console.log('Running monthly draw...');
});