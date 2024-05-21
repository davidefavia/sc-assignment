# SC assignment

## Setup

### Clone git repository

```
git clone https://github.com/davidefavia/sc-assignment.git
```

### nvm

Install [nvm](https://github.com/nvm-sh/nvm) on your machine following [the official instructions](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating).

Application supports `node v20`, run the following commands for the initial setup on your local machine:

```bash
nvm install 20
nvm alias default 20
```

### Dependencies

Install `npm` dependencies:

```bash
npm install
```

### Add secrets

Make a copy of `.env.example` file renaming it to `.env`. Add all the needed secrets (Application ID, client secret and tenant ID) to the environment variables files.

You should have something similar:

```bash
SC_BASE_URL=graph.microsoft.com
SC_APP_ID=application-id-123456
SC_CLIENT_SECRET=client-secret-654321000
SC_TENANT_ID=tenant-id-12-34-56-78-90
```

## Run

Run the following command to start the application:

```bash
npm start
```

A prompt asks you to choose an option between:

#### Download groups

Connect to Microsoft Graph API to create groups JSON files inside `./output/MSGraph/Groups`.

## Test

Unit tests are implemented with [Jest](https://jestjs.io/):

```bash
npm test
// OR
npm test -- --coverage
```

## Key assumptions

- Script has permissions to write to local filesystem.
- Auth token can't be reused across different runs: there isn't any storage for the auth token (no cookies, no filesystem, no database).
- Script can login as many times as needed, without the need to throttle login attempts or to reauthenticate in the middle.
- Auth token doesn't expire during the single run.

## Limitations and know issues

- I didn't have time to explore the results pagination implementation.
- 