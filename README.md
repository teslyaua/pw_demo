# Veriff Demo testing
This Project is used for demo test automation purposes of Veriff Demo app.
Project was created to show basic structure, not for being used as a framework for production system.

### Testing
Project for tests using Playwright as a framework for Web Testing / API test Automation.
Configuration is located in file playwright.config.ts. According to the tes task tests are run only in chrome browser with retry on failure. 

Test `[UI] Check Eesti language aria-labels` is failed by intention to show real bug in the system. 

### Local running
You could run test either by using playwright preinstalled : 
`npx playwright test`

Or use Docker container for it. 
`docker build -t demo_tests .` - to build docker container 

`docker run -it --rm  -v $PWD:/app demo_tests` - to run tests in the docker 

#### For generating actionable report after local: 

`npx playwright show-report` - will open the last test run report in the browser
