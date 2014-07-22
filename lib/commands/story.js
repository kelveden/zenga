var AgileZen = require('../agilezen'),
    printer = require('../printer');

exports.usage = function () {
    return "<storyId> [<extra field>] - details for the specified story";
};

exports.execute = function (config, storyId, extraInfo) {
    var client = new AgileZen(config);

    client.get("https://agilezen.com/api/v1/projects/${projectId}/stories/${storyId}", {
        path: {
            storyId: storyId.toString()
        },
        parameters: {
            "with": "details,tasks,comments,tags"
        }
    }, function (data, response) {
        if (response.statusCode === 200) {
            var story = JSON.parse(data);
            printer.printStory(story, extraInfo ? story[extraInfo] : null);

        } else {
            console.log("Story not found.".yellow);
        }
    });
};


