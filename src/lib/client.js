const AzureClient = require('./api');
require('dotenv').config();

const { SC_BASE_URL, SC_APP_ID, SC_CLIENT_SECRET, SC_TENANT_ID } = process.env;

const client = new AzureClient(SC_BASE_URL, SC_APP_ID, SC_CLIENT_SECRET, SC_TENANT_ID);

module.exports = { client };