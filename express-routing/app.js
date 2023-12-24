const express = require('express');
const morgan = require('morgan');
const app = express();
const ExpressError = require('./expressError');

const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

// Middleware for logging requests
app.use(morgan('dev'));

// Middleware for parsing and validating nums array
function parseNums(req, res, next) {
  if (!req.query.nums) {
    return next(new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400));
  }

  const numsAsStrings = req.query.nums.split(',');
  const nums = convertAndValidateNumsArray(numsAsStrings);

  if (nums instanceof Error) {
    return next(new ExpressError(nums.message));
  }

  req.nums = nums; // Attach the validated nums to the request object
  next();
}

app.get('/mean', parseNums, function(req, res) {
  const result = {
    operation: "mean",
    result: findMean(req.nums)
  };
  return res.send(result);
});

app.get('/median', parseNums, function(req, res) {
  const result = {
    operation: "median",
    result: findMedian(req.nums)
  };
  return res.send(result);
});

app.get('/mode', parseNums, function(req, res) {
  const result = {
    operation: "mode",
    result: findMode(req.nums)
  };
  return res.send(result);
});

// General error handler
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // Pass the error to the next piece of middleware
  return next(err);
});

// General error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

// Configuration for Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`Server starting on port ${PORT}`);
});

module.exports = app;
