var _ = require('lodash');

exports.printSeparator = function (s) {
    console.log((new Array(31)).join(s || "-"));
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
    })
};
