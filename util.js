const compose = (...functions) => args => functions.reduce((arg, fn) => fn(args), args);

module.exports = {compose};