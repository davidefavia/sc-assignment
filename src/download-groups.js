const client = require('./lib/client');
const { createGroupFiles } = require('./lib/utils');
const path = require('path');

client.auth().then(async () => {
    const { value: groups } = await client.getGroups();
    if(!Array.isArray(groups)) {
        throw new Error('Groups list isn\'t an array.');
    }
    const folderPath = path.resolve(__dirname, '../output/MSGraph/Groups/');
    createGroupFiles(groups, folderPath);
    console.log(`${groups.length} groups downloaded to ${folderPath}`);
}).catch(e => {
    throw e;
});