export function sanitizeFirebasePath(path) {
    return path.replace(/\W/g, "-");
}

