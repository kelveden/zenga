var agileZen = require('../agilezen-client'),
    printer = require('../printer');

exports.usage = function () {
    return "story <storyId> [<projectId>] - details for the specified story";
};

exports.execute = function (config, storyId, projectId) {
    agileZen.methods.getStory({
        path: {
            projectId: projectId || config.profile.project,
            storyId: storyId.toString()
        },
        headers: {
            "X-Zen-ApiKey": config.apiKey
        }
    }, function (data, response) {
        if (response.statusCode === 200) {
            var story = JSON.parse(data),
                statusColour = (story.status === "blocked") ? "red" : "yellow";

            printer.printSeparator("=");
            console.log(story.id.toString().cyan + " [" + story.status[statusColour] + "]")
            printer.printSeparator("=");

            console.log("Phase: ".cyan + story.phase.name);
            console.log("Owner: ".cyan + story.owner.name);
            printer.printSeparator();

            console.log(story.text[story.color]);

            if (story.blockedReason) {
                printer.printSeparator();
                console.log(story.blockedReason.red);
            }
            printer.printSeparator();

        } else {
            console.log("Story not found.".yellow);
        }
    });
};


