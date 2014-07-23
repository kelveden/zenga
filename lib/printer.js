var _ = require('lodash'),
    Table = require('cli-table'),
    Card = require('./card');

function repeatChar(char, times) {
    return (new Array(times)).join(char);
}

exports.printSeparator = function (s) {
    console.log(repeatChar(s || "-"));
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

exports.printStory = function (story, extra) {
    var card = new Card({ colour: story.color, width: 80 }),
        cardContents = [
            [ { content: story.text } ]
        ];

    if (story.owner) {
        cardContents.unshift([
            { content: story.id, width: 8, colour: "cyan" },
            { content: story.phase.name, width: 20 },
            { content: story.owner.name, colour: "green" }
        ]);
    } else {
        cardContents.unshift([
            { content: story.id, width: 8, colour: "cyan" },
            { content: story.phase.name }
        ]);
    }

    if (extra) {
        cardContents.push([ { content: extra }]);
    }

    if (story.blockedReason) {
        cardContents.push([ { content: story.blockedReason, colour: "red" }]);
    }

    card.render(cardContents);
};