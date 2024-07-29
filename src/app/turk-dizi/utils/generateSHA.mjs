import crypto  from 'crypto';

/**
 * Generates a SHA-256 hash for the given object.
 * @param {Object} obj - The object to hash.
 * @returns {string} - The SHA-256 hash as a hex string.
 */
function generateSHA(obj) {
  // Convert the object to a JSON string
  const jsonString = JSON.stringify(obj);

  // Create a hash object
  const hash = crypto.createHash('sha256');

  // Update the hash with the JSON string
  hash.update(jsonString);

  // Return the hash in hexadecimal format
  return hash.digest('hex');
}

// Example usage
// const exampleObject = { name: 'John Doe', age: 30, profession: 'Engineer' };
// const hash = generateSHA(exampleObject);
// console.log('SHA-256 Hash:', hash);

export default generateSHA