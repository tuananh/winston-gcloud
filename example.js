var winston = require('winston');
var uuid = require('uuid')

var GoogleCloudLogging = require('./lib/gcloud')

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