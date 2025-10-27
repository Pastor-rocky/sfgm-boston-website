# PM2 Process Manager Configuration for Namecheap Hosting
# This file manages your Node.js application process

module.exports = {
  apps: [{
    name: 'sfgm-boston',
    script: 'dist/index.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // Auto-restart configuration
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    
    // Restart policy
    min_uptime: '10s',
    max_restarts: 10,
    
    // Environment variables
    env_file: '.env.production'
  }]
};


