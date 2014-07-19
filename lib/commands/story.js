var AgileZen = require('../agilezen'),
    printer = require('../printer');

exports.usage = function () {
    return "story <storyId> [<projectId>] - details for the specified story";
};

exports.execute = function (config, storyId) {
    var client = new AgileZen(config);

    client.get("https://agilezen.com/api/v1/projects/${projectId}/stories/${storyId}", {
        path: {
            storyId: storyId.toString()
        },
        parameters: {
            "with": "details"
        }
    }, function (data, response) {
        if (response.statusCode === 200) {
            var story = JSON.parse(data);
            printer.printStory(story, story.details)

        } else {
            console.log("Story not found.".yellow);
        }
    });
};


