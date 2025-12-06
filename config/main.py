import os
import yaml
from redis import Redis
from cache_config import CacheConfig

def load_config(config_file):
    with open(config_file, 'r') as file:
        return yaml.safe_load(file)

def main():
    config_file = 'config.yaml'
    config = load_config(config_file)

    redis_host = config['redis']['host']
    redis_port = config['redis']['port']

    redis_client = Redis(host=redis_host, port=redis_port)

    cache_config = CacheConfig(redis_client, config['cache'])
    cache_config.save_config()

if __name__ == '__main__':
    main()