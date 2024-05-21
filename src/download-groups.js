const { client } = require('./lib/client');
const { createGroupFiles } = require('./lib/utils');

client.auth().then(async () => {
    const { value: groups } = await client.getGroups();
    const path = './output/MSGraph/Groups/';
    createGroupFiles(groups, path);
    console.log(`${groups.length} groups downloaded to ${path}`);
}).catch(error => {
    console.error(`Error on downloading groups: ${error}`);
});