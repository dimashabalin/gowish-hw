# gowish-hw
This is a test repository implements task for go-wish

#### Tech task:
1. Visit https://onskeskyen.dk
2. Create an account.
3. Using Playwright, write 2-3 automated tests that you consider the most important ones.
#### As a bonus but not required:
- Set up CI workflow (e.g. GitHub Actions)
- Implement screenshot comparison assertions
- Handle authentication
- Use Playwright fixtures
- Enable parallel run

### Overview:
1. **playwritght.config.ts**
   - defines basic playwright configuratoin including test directory, parallelism, CI props, report type, and active browsers
3. Basic Eslint config added in order to distrubute code styles across teams.
4. To install deps and run tests execute
   - **npm ci**
   - **npx playwright test**

### Tests description:
1. **e2e/home.spec.ts** - two basic tests visit landing page -> check basic elements -> compare screenshot with gold and opening login form
   - I have intentionally didn't add correct screenshot for CI in order to force retry and failure
2. **e2e/login.spec.ts** - login scenario using environment vars **LOGIN** and **PASS** according to task utilizes *fixtures* and written with POM (PageObject model) pattern. Authorization itself could be put in a fixture as well for future tests.
   - credentials are kept as secrets on CI
   - for the local run you can set it in *.env* file or just export, e.g. `export LOGIN=blabla@gmail.com`
