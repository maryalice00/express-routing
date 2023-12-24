/**
 * Build a frequency counter object from an array
 * @param {Array} arr any array
 * @returns {Object} frequency counter object
 */
function createFrequencyCounter(arr) {
  return arr.reduce((acc, next) => {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

/**
 * Find the most common element in the array
 * @param {Array} arr any array
 * @returns {number} the most frequent element
 */
function findMode(arr) {
  const freqCounter = createFrequencyCounter(arr);
  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
    }
  }

  return +mostFrequent;
}

/**
 * Attempt to convert an array of strings to an array of numbers
 * @param {Array} numsAsStrings array of strings
 * @returns {Array|Error} an array or an error object
 */
function convertAndValidateNumsArray(numsAsStrings) {
  const result = [];

  for (let i = 0; i < numsAsStrings.length; i++) {
    const valToNumber = Number(numsAsStrings[i]);

    if (typeof valToNumber !== 'number' || Number.isNaN(valToNumber)) {
      return new Error(`The value '${numsAsStrings[i]}' at index ${i} is not a valid number.`);
    }

    result.push(valToNumber);
  }

  return result;
}

/**
 * Calculate the mean of an array of numbers
 * @param {Array} nums array of numbers
 * @returns {number} the mean value
 */
function findMean(nums) {
  return nums.length === 0 ? 0 : nums.reduce((acc, cur) => acc + cur) / nums.length;
}

/**
 * Calculate the median of an array of numbers
 * @param {Array} nums array of numbers
 * @returns {number} the median value
 */
function findMedian(nums) {
  nums.sort((a, b) => a - b);

  const middleIndex = Math.floor(nums.length / 2);

  return nums.length % 2 === 0
    ? (nums[middleIndex] + nums[middleIndex - 1]) / 2
    : nums[middleIndex];
}

module.exports = {
  createFrequencyCounter,
  findMean,
  findMedian,
  findMode,
  convertAndValidateNumsArray,
};
