const fs = require('fs');

const createGroupFiles = (groups, path) => {
    if (fs.existsSync(path)) {
        fs.rmdirSync(path, { recursive: true });
    }
    fs.mkdirSync(path, { recursive: true });
    groups.forEach(group => {
        fs.writeFileSync(`${path}/${group.displayName}.json`, JSON.stringify(group, null, 4));
    });
}

module.exports = { createGroupFiles };