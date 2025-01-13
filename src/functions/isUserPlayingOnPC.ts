export function isUserPlayingOnPC() {
    const agent = navigator.userAgent
    const pc = !(/mobile|android|iphone|ipod|blackberry|windows phone|tablet|ipad|macintosh/i.test(agent.toLocaleLowerCase()) || /TV/i.test(agent))
    return pc
}