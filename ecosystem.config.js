module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : "UI",
      script    : "npm run build",
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production : {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : "node",
      host : "107.180.102.80",
      ref  : "origin/master",
      repo : "github.com/vijay122/m_ui.git",
      path : "/opt/bitnami/app/m_ui",
      "post-deploy" : "npm start && pm2 startOrRestart ecosystem.json --env production"
    },
    dev : {
      user : "node",
      host : "107.180.102.80",
      ref  : "origin/master",
      repo : "github.com/vijay122/m_ui.git",
      path : "/opt/bitnami/app/dev/m_ui",
      "post-deploy" : "npm start && pm2 startOrRestart ecosystem.json --env dev",
      env  : {
        NODE_ENV: "dev"
      }
    }
  }
}
