/**
 * Function to check if the current hostname belongs to the "test" subdomain.
 * 
 * This function extracts the first part of the hostname and compares it to "test".
 * 
 * @returns {boolean} True if the hostname starts with "test", false otherwise.
 */
export function isTestSubdomain() {
    const hostname = window.location.hostname;
    return hostname.split('.')[0] === "test";
}