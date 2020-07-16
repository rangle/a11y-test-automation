module.exports = {
  server: {
    command: 'BROWSER=none yarn start',
    port: 3000,
    launchTimeout: 30000,
    debug: process.env.DEBUG === "true"
  }
};