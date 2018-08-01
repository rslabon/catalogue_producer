const JMSClient = require("./JMSClient");

class App {

    constructor() {
        this.jmsClient = new JMSClient();
    }

    async start() {
        await this.jmsClient.connect();
    }
}

module.exports = new App();