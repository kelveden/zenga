var optimist = require('optimist'),
    args = optimist
        .usage('Usage: $0 <command> [<command-args>] [-p <profile>]')
        .describe('p', 'Profile defined in your ~/.zenga folder')
        .argv,
    colors = require('colors'),
    config = require('./config.js').loadConfig(args.p),
    _ = require('lodash');

colors.setTheme({ purple: "magenta", teal: "cyan", orange: "yellow" });

function printCommands(done) {
    var fs = require("fs"),
        path = require("path");

    console.log("Commands:");

    fs.readdir(__dirname + "/commands", function (err, files) {
        if (err) {
            throw err;
        }

        files.forEach(function (file) {
            console.log("  " + path.basename(file, ".js").green + " - " + require('./commands/' + file).usage());
        });

        done();
    });
}

function printProfiles() {
    console.log("Profiles:");

    _.keys(config.profiles).forEach(function (profile) {
        console.log("  " + profile.cyan);
    });

    console.log();
}

if ((args._.length === 0) || args.help) {
    optimist.showHelp();
    printProfiles();
    printCommands(process.exit);

} else {
    var commandName = args._[0],
        command = require('./commands/' + commandName + '.js'),
        commandArgs = args._.splice(1);

    commandArgs.unshift(config);

    command.execute.apply(null, commandArgs);
}

