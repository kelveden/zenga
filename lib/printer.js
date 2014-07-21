var _ = require('lodash');

exports.printSeparator = function (s) {
    console.log((new Array(51)).join(s || "-"));
};

exports.printObject = function (object, indent) {
    function padRight(string, length) {
        return string + (new Array((length - string.length) + 1).join(" "));
    }

    var indentPad = Array(indent).join(" ") || "",
        names = _.keys(object),
        longestName = names.reduce(function (currentLongestName, name) {
            return name.length > currentLongestName.length ? name : currentLongestName;
        }, "");

    names.forEach(function (name) {
        console.log(indentPad + padRight(name + ": ", longestName.length + 2) + object[name]);
    });
};

exports.printStory = function (story, content) {
    exports.printSeparator("=");
    console.log(story.id.toString().cyan + " | " + "Phase: ".cyan + story.phase.name + " | " + "Owner: ".cyan + story.owner.name)
    exports.printSeparator("=");

    console.log(story.text[story.color]);
    exports.printSeparator();

    if (content) {
        console.log(content);
        exports.printSeparator();
    }

    if (story.blockedReason) {
        console.log(story.blockedReason.red);
        exports.printSeparator();
    }
};