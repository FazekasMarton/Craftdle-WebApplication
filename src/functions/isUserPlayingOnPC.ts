/**
 * Function to check if the user is playing on a PC.
 * @returns True if the user is playing on a PC, false otherwise.
 */
export function isUserPlayingOnPC() {
    const agent = navigator.userAgent
    const isPC = !(/mobile|android|iphone|ipod|blackberry|windows phone|tablet|ipad|macintosh/i.test(agent.toLocaleLowerCase()) || /TV/i.test(agent))
    return isPC
}