var _ = require('lodash'),
    NRC = require('node-rest-client').Client,
    client = new NRC();

module.exports = function (config) {
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
        }
    }
};
