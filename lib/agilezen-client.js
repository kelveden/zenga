var NRC = require('node-rest-client').Client,
    client = new NRC();

client.registerMethod("getStory", "https://agilezen.com/api/v1/projects/${projectId}/stories/${storyId}", "GET");

module.exports = client;
