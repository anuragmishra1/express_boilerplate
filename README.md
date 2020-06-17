# Directory Structure

```
.
├── .dockerignore
├── .env
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── CODE_OF_CONDUCT.md
├── Dockerfile
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── controllers
│   │   ├── index.js
│   │   └── user.js
│   ├── db.js
│   ├── models
│   │   ├── index.js
│   │   └── user.js
│   ├── routes.js
│   ├── server.js
│   ├── services
│   │   ├── index.js
│   │   └── mongodb.js
│   └── utils
│       ├── auth.js
│       ├── httpLog.js
│       ├── index.js
│       ├── validation.js
│       ├── validationSchema.js
│       └── winston.js
└── tests
    ├── e2e
    │   └── note
    └── unit
        ├── note
        └── test.js
```