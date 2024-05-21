const AzureClient = require('./api');

describe('AzureClient', () => {
    let client;
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1Ni';

    beforeEach(() => {
        client = new AzureClient('example.com', 'appId-123', 'clientSecret-456', 'tenantId-789');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('defaultOptions', () => {
        it('should return default options', () => {
            expect(client.accessToken).toBeUndefined();
            expect(client.defaultOptions).toEqual({
                hostname: 'example.com',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${client.accessToken}`
                }
            });
        });
    });

    describe('getAccessToken', () => {
        it('should return access token', async () => {
            client.request = jest.fn().mockResolvedValue({ access_token: accessToken });
            const token = await client.getAccessToken();
            expect(client.request).toHaveBeenCalledWith(expect.objectContaining({
                hostname: 'login.microsoftonline.com',
                path: '/tenantId-789/oauth2/v2.0/token',
                method: 'POST',
            }), 'grant_type=client_credentials&client_id=appId-123&client_secret=clientSecret-456&scope=https://graph.microsoft.com/.default');
            expect(token).toEqual(accessToken);
        });
    });

    describe('auth', () => {
        it('should authenticate and store token', async () => {
            expect(client.accessToken).toBeUndefined();
            client.request = jest.fn().mockResolvedValue({ access_token: accessToken });
            await client.auth();
            expect(client.accessToken).toEqual(accessToken);
        });
    });

    describe('getGroups', () => {
        it('should return groups', async () => {
            const groups = [{ id: 'group-1' }, { id: 'group-2' }];
            client.request = jest.fn().mockResolvedValue(groups);
            const response = await client.getGroups();
            expect(response).toEqual(groups);
            expect(client.request).toHaveBeenCalledWith(expect.objectContaining({ path: '/v1.0/groups' }));
        });
    });
});