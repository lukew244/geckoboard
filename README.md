# Geckoboard-integration

https://lukew.geckoboard.com/dashboards/085B69AC48F33A3B

A simple node.js app that tracks USD-bitcoin exchange rate and pushes to a Geckoboard. Built in a few hours and designed to be as lightweight as possible, the app uses a database (RethinkDB with Thinky ORM) to store data and allow tracking over time.

Key goals of the design:

- The app consists of three files - database.js (which interfaces with RethinkDB), geckoboard.js (which interfaces with Geckoboard), and app.js, a controller managing requests between the two.
- Code is written for readability and ease of extraction - functions are designed to be transferable for use in further integrations, with a variable to select the currency being tracked.   
- The default time interval is set to 15 minutes, in line with the dataset being tracked.


Testing:

The app utilises Mocha and Chai, but has very limited testing as a result of the short timeframe of the build. During development, Bitcoin API requests were stubbed using a [mock API server](https://github.com/spyAPI/spyAPI) that I and others created; a better solution would be to intercept these calls within the test suite itself using a service like Node Nock.


Further considerations:

- Besides testing, additional next steps for the project would be to add validations for the received data, and limits on the data being passed to Geckoboard (which currently can accept 500 entries per dataset).
