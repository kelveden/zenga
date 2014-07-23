var _ = require('lodash'),
    Table = require('cli-table');

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

exports.printStory = function (story, content) {
    var cardWidth = 100,
        wrap = require('wordwrap')(cardWidth - 4),
        chars = { 'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗', 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝', 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼', 'right': '║', 'right-mid': '╢', 'middle': '│' },
        cardColour = story.color;

    function lineSeparator() {
        return chars["left-mid"][cardColour] + repeatChar(chars.mid[cardColour], cardWidth - 2) + chars["right-mid"][cardColour];
    }

    function pad(string, colour, width) {
        return string[colour] + repeatChar(" ", (width || cardWidth) - string.length - 3);
    }

    function printMultiLine(text, colour) {
        wrap(text).split("\n").forEach(function (line) {
            console.log(chars.left[cardColour] + " " + pad(line, colour) + chars.right[cardColour]);
        });
    }

    console.log(chars["top-left"][cardColour] + repeatChar(chars.top[cardColour], cardWidth - 2) + chars["top-right"][cardColour]);
    console.log(chars.left[cardColour] + " " + pad(story.id.toString(), "cyan") + chars.right[cardColour]);
//        chars.mid[cardColour] + " " +
//        pad(story.phase.name, "cyan", 20) + " " +
//        chars.mid[cardColour] + " " +
//        pad(story.owner.name, "green", (cardWidth - 20 - 7 - 4)) + " " +
//        chars.right[cardColour]);
    console.log(lineSeparator());

    printMultiLine(story.text, "white");

    if (story.blockedReason) {
        console.log(lineSeparator());
        printMultiLine(story.blockedReason, "red");
    }

    console.log(chars["bottom-left"][cardColour] + repeatChar(chars.bottom[cardColour], cardWidth - 2) + chars["bottom-right"][cardColour]);
//
//    var table = new Table({
//        chars: { 'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗', 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝', 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼', 'right': '║', 'right-mid': '╢', 'middle': '│' },
//        head: [ story.id + (" [" + story.owner.name + "]").white, story.phase.name ]
//    });
//
//    table.push(
//        [ story.text[story.color], "" ]
//    );
//
//    if (story.blockedReason) {
//        [ story.blockedReason.red, "" ]
//    }
//
//    console.log(table.toString());
//
//    exports.printSeparator("=");
//    console.log(story.id.toString().cyan +
//        " | " + "Phase: ".cyan + story.phase.name +
//        (story.owner ? " | " + "Owner: ".cyan + story.owner.name : ""))
//    exports.printSeparator("=");
//
//    console.log(story.text[story.color]);
//    exports.printSeparator();
//
//    if (content) {
//        console.log(content);
//        exports.printSeparator();
//    }
//
//    if (story.blockedReason) {
//        console.log(story.blockedReason.red);
//        exports.printSeparator();
//    }
};