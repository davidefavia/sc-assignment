const { Select } = require('enquirer');

const prompt = new Select({
    name: 'script',
    message: 'Which script do you want to run?',
    choices: [{
        message: 'Download groups',
        name: 'download-groups',
    }]
});

/**
 * Didn't use top-level await because enquirer is a CommonJS module.
 */
prompt.run().then(async answer => {
    /**
     * Used dynamic import to ESM-only version of execa.
     */
    const { execa } = await import('execa');
    switch (answer) {
        case 'download-groups':
            const { stdout, stderr } = await execa`node ./src/download-groups.js`;
            if(stdout) {
                console.log(stdout);
            }
            if(stderr) {
                console.error(stderr);
            }
            break;
        default:
            console.log('No script selected');
            break;
    }
}).catch(error => {
    console.error(`Error on running script: ${error}`);
});