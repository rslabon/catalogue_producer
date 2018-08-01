const fs = require("fs");
const _ = require("lodash");
const Logger = require("./Logger");

const log = new Logger("MessageDiskWriter.js");

function to2Digit(number) {
    return _.padStart(number, 2, "0");
}

function mkdir(dir) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}

class MessageDiskWriter {

    static write(fileName, xmlString) {
        const currentDate = new Date();

        const rootDir = "feeds";
        mkdir(rootDir);

        const dir = `${rootDir}/${to2Digit(currentDate.getDay())}_${to2Digit(currentDate.getMonth())}_${currentDate.getFullYear()}`;
        mkdir(dir);

        fs.writeFile(`${dir}/${fileName}.xml`, xmlString, (err) => {
            if (err) throw err;

            log.info("Message saved!");
        });
    }
}

module.exports = MessageDiskWriter;

