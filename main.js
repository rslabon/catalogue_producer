const App = require("./App");
const MessageDiskWriter = require("./MessageDiskWriter");
const compose = require("./util").compose;
const Logger = require("./Logger");

const log = new Logger("index.js");

function messageCallback(messageFileName) {
    return compose(
        (message) => log.info(message),
        (message) => MessageDiskWriter.write(messageFileName, message.body)
    );
}

(async function () {
    log.info("Starting application...");

    await App.start();

    App.jmsClient.listen("queue1", messageCallback("queue1"), true);

    log.info("End of MAIN");

})();
