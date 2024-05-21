const https = require('node:https');

class AzureClient {
    constructor(baseUrl, clientId, clientSecret, tenantId) {
        this.baseUrl = baseUrl;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.tenantId = tenantId;
    }

    get defaultOptions() {
        return {
            hostname: this.baseUrl,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.accessToken}`
            }
        };
    }

    async request(options, data = '') {
        /**
         * Using promises because async/await is not supported in https.request
         */
        return new Promise((resolve, reject) => {
            const req = https.request(options, res => {
                let body = '';
                res.on('data', chunk => {
                    body += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(body));
                });
            });
            req.on('error', reject);
            req.write(data);
            req.end();
        });
    }

    /**
     * @see https://learn.microsoft.com/en-us/graph/auth-v2-service?tabs=http#token-request
     */
    async getAccessToken() {
        const scope = 'https://graph.microsoft.com/.default';
        const data = `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}&scope=${scope}`;
        const options = {
            hostname: 'login.microsoftonline.com',
            path: `/${this.tenantId}/oauth2/v2.0/token`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length
            }
        };
        const response = await this.request(options, data);
        return response.access_token;
    }

    async auth() {
        this.accessToken = await this.getAccessToken();
    }

    /**
     * @see https://learn.microsoft.com/en-us/graph/api/group-list?view=graph-rest-1.0&tabs=http
     */
    async getGroups() {
        return this.request({
            ...this.defaultOptions,
            ...{
                path: '/v1.0/groups'
            }
        });
    };
}

module.exports = AzureClient;