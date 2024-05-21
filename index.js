const { Select } = require('enquirer');

/**
 * Prompt user to select a script to run.
 */
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
            if(stderr) {
                throw stderr;
            }
            console.log(stdout);
            break;
        default:
            console.error('No script selected');
            break;
    }
}).catch(e => {
    console.error(e.message);
});