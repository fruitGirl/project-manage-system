module.exports = {
  apps : [{
    name: "pms",
    script: "./server/index.js",
    instances: "max",
    watch: false,
    max_memory_restart: "1G",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "development",
      PORT: 8001
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 8001
    }
  }]
};
