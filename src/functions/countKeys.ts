interface AnyObject {
    [key: string]: any;
}

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