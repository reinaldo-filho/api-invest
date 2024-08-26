import app from '../app.js';
import config from '../config/constants.js';

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}...`);
});
