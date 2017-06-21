const Monitor = require('monitor');
const request = require('request')
const LOW_MEMORY_THRESHOLD = 100000000;
const token = 'iKKmvpqvMQferj1TlNtonnN5wYFAyVvFOFfVqKa1bLs';

var options = {
  probeClass: 'Process',
  initParams: {
    pollInterval: 10000
  }
}
var processMonitor = new Monitor(options);

processMonitor.on('change', () => {
  var freemem = processMonitor.get('freemem');
  var msg = "Your Free memory Left "+freemem;
  request({
     method: 'POST',
     uri: 'https://notify-api.line.me/api/notify',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
  },
     'auth': {
       'bearer': token
  },form: {
       message: msg,
    }
  }, (err,httpResponse,body) => {
     console.log(JSON.stringify(err));
     console.log(JSON.stringify(httpResponse));
     console.log(JSON.stringify(body));
  })
});

processMonitor.connect((error) => {
  if (error) {
    console.error('Error connecting with the process probe: ', error);
    process.exit(1);
  }
});