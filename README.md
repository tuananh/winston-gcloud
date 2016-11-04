# winston-gcloud

> Google Cloud Logging transport for winston

GCL transport for winston with support for queue and batch write to reduce api usage.

# Installation

```
$ npm install winston-gcloud --save
```

# Usage
``` js
var winston = require('winston')

var GoogleCloudLogging = require('winston-gcloud')

var options = {
    level: 'verbose',
    gcl_project_id: '<project-id>',
    gcl_key_filename: '<key-file-name>',
    gcl_log_name: '<log-name>',
    batch_size: 5
}
winston.add(GoogleCloudLogging, options);

winston.error('test', {msg: Math.random()})
winston.error('test', {msg: Math.random()})
winston.error('test', {msg: Math.random()})
winston.error('test', {msg: Math.random()})
winston.error('test', {msg: Math.random()})
winston.error('test', {msg: Math.random()})
winston.error('test', {msg: Math.random()})
winston.error('test', {msg: Math.random()})
winston.error('test', {msg: Math.random()})
winston.error('test', {msg: Math.random()})
```

`winston-gcloud` use [better-queue](https://github.com/diamondio/better-queue) for queue management.

## License

MIT © [Tuan Anh Tran](https://tuananh.org)