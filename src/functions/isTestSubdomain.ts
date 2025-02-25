export function isTestSubdomain() {
    const hostname = window.location.hostname;
    return hostname.split('.')[0] === "test";
}