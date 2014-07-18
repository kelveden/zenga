var fs = require('fs');

exports.loadConfig = function (profile) {
    function loadConfigFile(path) {
        try {
            return JSON.parse(fs.readFileSync(path, "utf8"));

        } catch (e) {
            console.log("Could not load configuration file.".red);
            console.log(e);
            process.exit(1);
        }
    }

    var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        config = loadConfigFile(homeDir + "/.zenga/config.json"),
        profileName = profile || config.defaultProfile,
        profileConfig = config.profiles[profileName];

    if (!profileConfig) {
        console.log("Could not load configuration for profile '" + profileName + "'.".red);
        process.exit(1);

    } else {
        config.profile = profileConfig;
    }

    return config;
};
