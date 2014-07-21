var AgileZen = require('../agilezen'),
    printer = require('../printer');

exports.usage = function () {
    return "me - the stories currently assigned to me";
};

exports.execute = function (config, phase) {
    var client = new AgileZen(config),
        commandOptions = {
            parameters: {
                "where": "not(status:invalid)"
            }
        };

    if (phase) {
        commandOptions.parameters.where = commandOptions.parameters.where + " and phase:" + phase;
    }

    client.get("https://agilezen.com/api/v1/me/stories", commandOptions,
        function (data, response) {
            if (response.statusCode === 200) {
                var stories = JSON.parse(data);

                stories.items.forEach(function (story) {
                    printer.printStory(story);
                });

//            printer.printStory(story, story.details)

            } else {
                console.log("Story not found.".yellow);
            }
        });
};


