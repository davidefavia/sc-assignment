describe('client', () => {
    const OLD_ENV = process.env;

    beforeEach(async () => {
        /**
         * It clear the cache
         */
        jest.resetModules();

        process.env = { ...OLD_ENV };
    });

    afterEach(() => {
        process.env = OLD_ENV;
    });

    it('should export client', () => {
        const client = require('./client');
        expect(client).toBeDefined();
    });

    it('shoudl setup the client', () => {
        process.env.SC_BASE_URL = 'example.com';
        process.env.SC_APP_ID = 'app-id';
        process.env.SC_CLIENT_SECRET = 'abcdeff123456';
        process.env.SC_TENANT_ID = 'tenant-id';

        const client = require('./client');

        expect(client.baseUrl).toBe('example.com');
        expect(client.clientId).toBe('app-id');
        expect(client.clientSecret).toBe('abcdeff123456');
        expect(client.tenantId).toBe('tenant-id');
    });

    it('should expose methods', () => {
        const client = require('./client');
        expect(client.getAccessToken).toBeDefined();
        expect(client.auth).toBeDefined();
    });
});