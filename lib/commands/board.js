var AgileZen = require('../agilezen'),
    printer = require('../printer'),
    when = require('when'),
    sequence = require('when/sequence'),
    Table = require('cli-table'),
    initials = require('initials');

exports.usage = function () {
    return "show overview of the story board";
};

exports.execute = function (config) {
    var client = new AgileZen(config);

    function getStories(phases) {
        var tasks = phases.map(function (phase) {
            return function () {
                var deferred = when.defer();

                client.get("https://agilezen.com/api/v1/projects/${projectId}/phases/${phaseId}/stories", {
                        path: {
                            phaseId: phase.id
                        },
                        parameters: {
                            pageSize: 10
                        }
                    },
                    function (data, response) {
                        if (response.statusCode === 200) {
                            deferred.resolve({ phase: phase, stories: JSON.parse(data).items });

                        } else {
                            deferred.reject(phase.name + ": " + response.statusCode);
                        }
                    });

                return deferred.promise;
            }
        });

        return sequence(tasks);
    }

    function getPhases() {
        var deferred = when.defer();

        client.get("https://agilezen.com/api/v1/projects/${projectid}/phases", {},
            function (data, response) {
                if (response.statusCode === 200) {
                    deferred.resolve(JSON.parse(data).items);
                } else {
                    deferred.reject(response);
                }
            });

        return deferred.promise;
    }

    function printStories(storiesResults) {
        var table = new Table({
                chars: { 'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗', 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝', 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼', 'right': '║', 'right-mid': '╢', 'middle': '│' },
                style: { head: ["inverse"]},
                head: storiesResults.map(function (storiesObject) {
                    return storiesObject.phase.name
                })
            }),
            contents = storiesResults.map(function (storiesObject) {
                return storiesObject.stories.map(function (story) {
                    var result = story.id.toString(),
                        colour = story.color;

                    if (story.owner) {
                        result = result + " [" + initials(story.owner.name) + "]";
                    }

                    return result[colour];
                })
            });

        for (var i = 0; i < 10; i++) {
            table.push(contents.map(function (phaseArray) {
                if (phaseArray.length > i) {
                    return phaseArray[i];
                } else {
                    return "";
                }
            }));
        }

        console.log(table.toString());
    }

    return getPhases()
        .then(getStories)
        .then(printStories)
        .catch(function (err) {
            console.error(err);
        })
        .done();
};

