interface AnyObject {
    [key: string]: any;
}

/**
 * Function to count the total number of keys in an object, including nested objects.
 * 
 * This function recursively traverses the object and counts all keys, including those
 * in nested objects.
 * 
 * @param obj - The object to count keys in.
 * @returns {number} The total number of keys in the object.
 */
export function countObjectKeys(obj: AnyObject): number {
    let count = 0;

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            count++;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                count += countObjectKeys(obj[key]);
            }
        }
    }

    return count;
}