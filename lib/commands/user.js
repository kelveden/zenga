var AgileZen = require('../agilezen'),
    printer = require('../printer');

exports.usage = function () {
    return "<user> [<phase>] - the stories where the specified user is the owner";
};

exports.execute = function (config, owner, phase) {
    if (owner && owner.toLowerCase() === "me") {
        require('./me').execute(config, phase);
        return;
    }

    var client = new AgileZen(config),
        commandOptions = {
            path: {
                phase: phase
            },
            parameters: {
                "where": "not(status:invalid)"
            }
        };

    if (owner) {
        commandOptions.parameters.where = commandOptions.parameters.where + " and owner:\"" + owner + "\"";
    }

    if (phase) {
        commandOptions.parameters.where = commandOptions.parameters.where + " and phase:" + phase;
    }

    client.get("https://agilezen.com/api/v1/projects/${projectid}/stories", commandOptions,
        function (data, response) {
            if (response.statusCode === 200) {
                var stories = JSON.parse(data);

                stories.items.forEach(function (story) {
                    printer.printStory(story);
                });

            } else {
                console.log("No stories found.".yellow);
            }
        });
};


