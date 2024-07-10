// Import the handler function from where it's defined
const { handler } = require('./NameMatcherLambda/matcher.js');

// Simulate the event and context
const event = {
    queryStringParameters: {
        name: "华文吴"
    }
};
const context = {};

// Call the handler function
handler(event, context)
    .then(response => console.log('Response:', response))
    .catch(err => console.error('Error:', err));
