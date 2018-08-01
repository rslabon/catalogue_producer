class Logger {

    constructor(name) {
        this.name = name;
    }

    info(message) {
        const entry = typeof message === "object" ? JSON.stringify(message) : message.toString();
        console.log(`${new Date()}---${this.name}---${entry}`);
    }
}

module.exports = Logger;