export function uuidv4(): string {
    const hexChars = "0123456789abcdef";
    let uuid = "";
  
    for (let i = 0; i < 32; i++) {
        const randomIndex = Math.floor(Math.random() * 16);
        const char = hexChars[randomIndex];
        uuid += char;
        if (i === 7 || i === 11 || i === 15 || i === 19) {
            uuid += "-";
        }
    }
  
    return uuid;
}