exports.usage = function () {
    return "<phase> [<user>] - the stories in the specified phase";
};

exports.execute = function (config, phase, owner) {
    require('./user').execute(config, owner, phase);
};


