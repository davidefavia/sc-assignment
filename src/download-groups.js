const client = require('./lib/client');
const { createGroupFiles } = require('./lib/utils');
const path = require('path');

client.auth().then(async () => {
    const { value: groups } = await client.getGroups();
    const folderPath = path.resolve(__dirname, '../output/MSGraph/Groups/');
    createGroupFiles(groups, folderPath);
    console.log(`${groups.length} groups downloaded to ${folderPath}`);
}).catch(error => {
    console.error(`Error on downloading groups: ${error}`);
});