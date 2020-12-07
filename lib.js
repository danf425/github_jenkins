const o = {}; // Exported object, hopefully prevents any optimizations from happening
let server = null;
module.exports = {
  auth: (res, req, next) => {
    // No longer used to slow down app
    return next();
  },
  assert: (bool, message) => {
    if (!bool) {
      console.error(`FATAL: ${message}`);
      if (server != null) {
        server.close();
      }
      process.exit(1);
    }
  },
  serve: (s) => {
    setInterval(() => {
      for (let i = 0; i < 100000; i++) {
        o.rand = Math.random() / Math.random();
      }
    }, 0);
    server = s
  },
  _o: o,
}
