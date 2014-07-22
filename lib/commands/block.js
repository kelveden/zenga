var AgileZen = require('../agilezen');

exports.usage = function () {
    return "<storyId> <reason> - blocks the specified story";
};

exports.execute = function (config, storyId, reason) {
    var client = new AgileZen(config);

    client.put("https://agilezen.com/api/v1/projects/${projectId}/stories/${storyId}", {
        data: {
            blockedReason: reason,
            status: "blocked"
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


