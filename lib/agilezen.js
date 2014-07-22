var _ = require('lodash'),
    NRC = require('node-rest-client').Client;

module.exports = function (config) {
    var client = new NRC(config.proxy ? {
        proxy: {
            host: config.proxy.host,
            port: config.proxy.port,
            tunnel: true
        }
    } : null);

    return  {
        "get": function (uri, options, callback) {
            return client.get(uri, _.merge(options, {
                path: {
                    projectId: config.profile.project
                },
                headers: {
                    "X-Zen-ApiKey": config.apiKey
                }
            }), callback);
        },
        "put": function (uri, options, callback) {
            return client.put(uri, _.merge(options, {
                path: {
                    projectId: config.profile.project
                },
                headers: {
                    "X-Zen-ApiKey": config.apiKey
                }
            }), callback);
        }
    }
};
