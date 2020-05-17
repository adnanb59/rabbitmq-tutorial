const severities = new Set(["info", "warning", "error"]);
const facilities = new Set(["root", "admin", "user"]);

const isValid = (key) => {
    let tokens = key.split(".");
    if (tokens[0].length == 0 || tokens[1].length == 0) return false;

    return (severities.has(tokens[1]) || tokens[1] == "*" || tokens[1] == "#") &&
           (facilities.has(tokens[0]) || tokens[0] == "*" || tokens[0] == "#");
}

module.exports = isValid;