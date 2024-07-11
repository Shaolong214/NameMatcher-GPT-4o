const { handler } = require('./NameMatcherLambda/matcher.js');

// Simulate the event
const event = {
    queryStringParameters: {
        name: "ani li"
    }
};
const context = {};

handler(event, context)
    .then(response => console.log('Response:', response))
    .catch(err => console.error('Error:', err));
