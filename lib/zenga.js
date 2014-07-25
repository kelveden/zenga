var zenga = require('commander'),
    colors = require('colors'),
    _ = require('lodash');

zenga
    .version('0.0.1')
    .usage('<sub-command> [<sub-command-args>]')
    .option('-p, --profile <profile>', 'Profile defined your ~/.zenga/config.json')
    .parse(process.argv);

colors.setTheme({ purple: "magenta", teal: "cyan", orange: "yellow" });

function printCommands(done) {
    var fs = require("fs"),
        path = require("path");

    console.log("  Commands:");

    fs.readdir(__dirname + "/commands", function (err, files) {
        if (err) {
            throw err;
        }

        files.forEach(function (file) {
            console.log("    " + path.basename(file, ".js").green + " " + require('./commands/' + file).usage());
        });

        done();
    });
}

function printProfiles() {
    console.log("  Profiles:");

    _.keys(config.profiles).forEach(function (profile) {
        console.log("    " + profile.cyan);
    });

    console.log();
}

var args = zenga.args,
    config = require('./config.js').loadConfig(args.profile);

if ((args.length === 0) || args.help) {
    zenga.outputHelp();
    printProfiles();
    printCommands(process.exit);

} else {
    var commandName = args[0],
        command = require('./commands/' + commandName + '.js'),
        commandArgs = args.splice(1);

    commandArgs.unshift(config);

    command.execute.apply(null, commandArgs);
}

