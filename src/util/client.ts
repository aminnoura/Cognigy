const { SocketClient } = require("@cognigy/socket-client");
import { REACT_APP_ENDPOINT, REACT_APP_TOKEN } from "../../conf";

let client = new SocketClient(REACT_APP_ENDPOINT as string, REACT_APP_TOKEN as string, {
    forceWebsockets: true,
});

export {client};