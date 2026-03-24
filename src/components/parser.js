Here's the code for `parser.js` in the `cache-redis-config` project:

```javascript
const { parse } = require('yaml');
const { readFileSync } = require('fs');
const { join } = require('path');

class RedisConfigParser {
  constructor(configPath) {
    this.configPath = configPath;
  }

  loadConfig() {
    try {
      const fileContent = readFileSync(join(process.cwd(), this.configPath), 'utf8');
      return parse(fileContent);
    } catch (error) {
      throw new Error(`Failed to load Redis config: ${error.message}`);
    }
  }

  validateConfig(config) {
    if (!config) {
      throw new Error('Config is empty or undefined');
    }

    const requiredFields = ['host', 'port'];
    const missingFields = requiredFields.filter(field => !config[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    if (typeof config.port !== 'number') {
      throw new Error('Port must be a number');
    }

    return true;
  }

  parse() {
    const config = this.loadConfig();
    this.validateConfig(config);
    return config;
  }
}

module.exports = RedisConfigParser;
```