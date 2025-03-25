/**
 * Function to check if the user is playing on a PC.
 * 
 * This function analyzes the `navigator.userAgent` string to determine if the user
 * is using a PC. It checks for common mobile, tablet, and TV device identifiers.
 * 
 * @returns {boolean} True if the user is playing on a PC, false otherwise.
 */
export function isUserPlayingOnPC() {
    const agent = navigator.userAgent
    const isPC = !(/mobile|android|iphone|ipod|blackberry|windows phone|tablet|ipad|macintosh/i.test(agent.toLocaleLowerCase()) || /TV/i.test(agent))
    return isPC
}