const { createGroupFiles } = require('./utils');
const fs = require('fs');

describe('createGroupFiles', () => {
    const path = '/tmp/test';
    const groups = [
        { displayName: 'group1' },
        { displayName: 'Display name 2' }
    ];

    beforeEach(() => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(false);
        jest.spyOn(fs, 'mkdirSync').mockReturnValue();
        jest.spyOn(fs, 'rmdirSync').mockReturnValue();
        jest.spyOn(fs, 'writeFileSync').mockReturnValue();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should create a directory with 2 files', () => {
        createGroupFiles(groups, path);
        expect(fs.mkdirSync).toHaveBeenCalledWith(path, { recursive: true });
        expect(fs.rmdirSync).not.toHaveBeenCalled();
        expect(fs.writeFileSync).toHaveBeenCalledTimes(2);
        expect(fs.writeFileSync.mock.calls[0][0]).toBe(`${path}/group1.json`);
        expect(fs.writeFileSync.mock.calls[1][0]).toBe(`${path}/Display name 2.json`);
    });

    it('should create write JSON content', () => {
        createGroupFiles(groups, path);
        expect(fs.writeFileSync.mock.calls[0][1]).toBe(JSON.stringify(groups[0], null, 4));
        expect(fs.writeFileSync.mock.calls[1][1]).toBe(JSON.stringify(groups[1], null, 4));
    });
});