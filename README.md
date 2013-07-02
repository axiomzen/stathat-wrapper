stathat-wrapper
===============

Wraps stathat's (nodejs library)[https://github.com/stathat/shlibs/tree/master/node] to easily build prefixed statistics based on runtime environment and application

### Usage

```js
var stathatWrapper = require('stathat-wrapper'),
    stathat = stathatWrapper("you@example.com", {
      // configuration options
      prefix: "application name" // default is nothing
      environment: "production" // default is process.env.NODE_ENV || 'development'
      separator: " - " // separates prefix from environment from statname, default is " - " 
      reporting: true // set to false to turn off reporting (i.e. in testing mode)
    });

stathat.count('statistic', 3); // reports "application name - production - statistic": 3
stathat.value('value', 22.75); // reports "application name - production - value": 22.75

```

### Tests

run the test suite with `npm test` or `mocha`
