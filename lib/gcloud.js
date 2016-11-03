var util    = require('util')
var winston = require('winston')
var Queue   = require('better-queue')

var GoogleCloudLogging = function(options) {
    this.name  = 'GoogleCloudLogging'
    this.level = options.level || 'info'

    options.gcl_project_id   = options.gcl_project_id || ''
    options.gcl_key_filename = options.gcl_key_filename || ''
    options.gcl_log_name     = options.gcl_log_name ||  ''
    options.batch_size       = options.batch_size || 1

    this.logging = require('@google-cloud/logging')({
        projectId: options.gcl_project_id,
        keyFilename: options.gcl_key_filename
    })

    this.gcl_resource = {
        resource: {
            type: 'gce_instance'
        }
    }

    this.log_bucket = this.logging.log(options.gcl_log_name)

    var self = this

    this.queue = new Queue(function(batch, cb) {
        // To improve throughput and to avoid exceeding the quota limit, use `write()`
        self.log_bucket.write(batch)
            .then(function(resp) {
                console.log('ok')
            })
            .catch(function(err) {
                console.log('err', err)
            })
        cb()
    }, { batchSize: options.batch_size })

}

util.inherits(GoogleCloudLogging, winston.Transport)
winston.transports.GoogleCloudLogging = GoogleCloudLogging

GoogleCloudLogging.prototype.log = function(level, msg, meta, callback) {
    var data = {
        message: msg,
        level: level,
        data: meta
    }

    var entry = this.log_bucket.entry(this.gcl_resource, data)

    // DEFAULT      (0) The log entry has no assigned severity level.
    // DEBUG        (100) Debug or trace information.
    // INFO         (200) Routine information, such as ongoing status or performance.
    // NOTICE       (300) Normal but significant events, such as start up, shut down, or a configuration change.
    // WARNING      (400) Warning events might cause problems.
    // ERROR        (500) Error events are likely to cause problems.
    // CRITICAL     (600) Critical events cause more severe problems or outages.
    // ALERT        (700) A person must take an action immediately.
    // EMERGENCY    (800) One or more systems are unusable.

    if (level == "verbose" || level == "info") {
        entry.severity = 'INFO'
    } else if (level == "debug" || level == "silly") {
        entry.severity = 'DEBUG'
    } else if (level == "warn") {
        entry.severity = 'WARNING'
    } else if (level == "error") {
        entry.severity = 'ERROR'
    }

    this.queue.push(entry)

    return callback(null, true)
}

module.exports = GoogleCloudLogging
