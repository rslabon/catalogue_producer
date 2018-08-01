'use strict';
const Stomp = require('stomp-client');
const parseXmlString = require('xml2js').parseString;

const noop = () => {
};

class JMSClient {

    constructor(connection = {host: '127.0.0.1', port: 61613, u: 'admin', p: 'admin'}) {
        this.stompClient = new Stomp(connection.host, connection.port, connection.u, connection.p);
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.stompClient.connect(resolve, reject);
        });
    }

    disconnect() {
        return new Promise((resolve, reject) => {
            this.stompClient.disconnect(resolve, reject);
        });
    }

    listen(queue, messageCallback = noop, parseXml = false) {
        this.stompClient.subscribe(`/queue/${queue}`, (body, headers) => {
            if (parseXml) {
                parseXmlString(body, (err, xml) => {
                    messageCallback({body, headers, xml});
                });
            } else {
                messageCallback({body, headers});
            }
        });
    }
}

module.exports = JMSClient;