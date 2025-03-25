/**
 * Function to count the total number of keys in an object, including nested objects.
 * 
 * This function recursively traverses the object and counts all keys, including those
 * in nested objects.
 * 
 * @param obj - The object to count keys in.
 * @returns {number} The total number of keys in the object.
 */
export function countObjectKeys(obj: Record<string, unknown>): number {
    return Object.keys(obj).filter(key => Object.prototype.hasOwnProperty.call(obj, key)).length;
}