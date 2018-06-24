// ========================================
// Helpers
/**
 * Sets ordinal display for numbers (i.e. 1st, 2nd, 3rd)
 * @param  {Number} num Number to display
 * @return {String} Ordinal style number display
 */
export default function getOrdinal(num) {
  var s = ['th','st','nd','rd'],
  v = num % 100;
  return num + (s[(v - 20) % 10] || s[v] || s[0]);
 }
