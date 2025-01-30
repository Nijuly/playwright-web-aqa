## Greetings %username% !

This is a quick manual on what we expect from you during performing the test task.
This will be a simple app that contains two features: Login & Convert file to docx feature.

## Getting Started

### Pre-requisites

Node 18 or higher (20-22 preferred)
Project uses React 19, but react-dropzone doesn't support it yet, so need legacy deps.

```sh
npm install --legacy-peer-deps
```

## Run the app

```sh
npm run dev
```

Terminal will provide a link to the app.
By default, it will be `http://localhost:3000` (aka `origin`)

#### Login Credentials:

- email: `aqa@example.com`
- password: `SecurePassword`

* First of all, get to know with the application under test, build the web app and check out its possibilities and bugs.

* Second of all, we need to evaluate your qa manual background, so create down below:

- short testplan
- list of the testcases
- list of discovered issues

* Third of all, write test automation according test automation purposes

* And fourth of all, push the whole project to github.com and notice us with a link to your repo on completion.

Please reachout Oksana (otolstykh@readdle.com) if you have any questions.

## Good Luck!

- p.s. Do not tamper codebase of application
- You can modify only `/web-aqa/src/lib/config.ts` to generate more or less errors

#YOUR TASK STARTS HERE:

# TEST PLAN:

- Environment:
  Tests will be performed on the local server in 3 paralell with the different configuration of application

- What parts of app will be tested:
  - Login
  - Logout
  - Upload files
  - Download files
  - File history

# LIST OF TEST CASES:

// Only summaries of tests: e.g.

- Convert documents test › Validate elements at the convert page
- Convert documents test › Upload file
- Convert documents test › Remove file from Drag and Drop area
- Convert invalid documen test > Download docx file
- Download documents test › Download file
- History test › Validate elements at the history page
- History test › Should save history
- History test › Should remove all entries
- History test › Should back to the convert page
- History test › Should remove specific item from the history
- Login user test › Validate elements at the login page
- Login user test › Login with a valid username and valid password
- Login user test › Login with a valid username and invalid password
- Login user test › Login with a invalid username and invalid password
- Login user test › Login with a invalid username and valid password
- Login user test › Login with a empty username and password
- Login user test › Login with a empty username and valid password
- Login user test › Login with a valid username and empty password
- Login user test › Login with password for another user
- Logout user test › Should logout from convert page
- Logout user test › Should logout from history page

# LIST OF DISCOVERED ISSUES:

// Only summaries of bug reports: e.g.

- Random error messages when user tries to log in with invalid credentials and gets status code 200
- Random error messages when user tries to convert doc file
- Button for download document disappeards randomly
- The file aren't saved in the history list if the list has already file with the same name, only result of convert is updated (could be a feature)
- Only 11 items are saved in the history (could be a feature)
- Sensetive data like login and password are visible in the browser consol and in the cookies
- User can add any value for cookies and he will be login in application
