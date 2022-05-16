import { createApp } from "vue";
import VueSocketIO, { VueSocketOptions } from "vue-3-socket.io";
import SocketIO, { ManagerOptions, SocketOptions } from "socket.io-client";
import App from "./App.vue";

const socketIoConnectionOptions:
  | Partial<ManagerOptions & SocketOptions>
  | undefined = undefined;
const vueSocketIoOptions: VueSocketOptions = {
  debug: true,
  connection: SocketIO("http://localhost:3001", socketIoConnectionOptions),
};

createApp(App).use(new VueSocketIO(vueSocketIoOptions)).mount("#app");
