var AgileZen = require('../agilezen');

exports.usage = function () {
    return "<storyId> - unblocks the specified story";
};

exports.execute = function (config, storyId) {
    var client = new AgileZen(config);

    client.put("https://agilezen.com/api/v1/projects/${projectId}/stories/${storyId}", {
        data: {
            blockedReason: null,
            status: "started"
        },
        path: {
            storyId: storyId.toString()
        }
    }, function (data, response) {
        if (response.statusCode === 200) {
            console.log("Done.")
        } else {
            console.log("Response code: " + response.statusCode);
        }
    });
};


