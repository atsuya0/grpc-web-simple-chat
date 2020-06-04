<template>
  <section>
    <div v-if="!userToken">
      <input v-model="userName" />
      <button @click="login">名前を入力</button>
    </div>
    <div v-else>
      <ul>
        <li v-for="message of messages">
          {{ message.getUser().getName() }}
          {{ message.getContent() }}
        </li>
      </ul>
      <input v-model="message" />
      <button @click="sendMessage">送信</button>
    </div>
  </section>
</template>

<script>
import { Message, User } from '../proto/chat_pb'
import { ChatServiceClient } from '../proto/chat_grpc_web_pb'
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

export default {
  name: "Chat",
  data: () => ({
    userName: "",
    userToken: "",
    message: "",
    messages: [],
    client: new ChatServiceClient('http://localhost:10000', null, null),
    stream: null,
  }),
  methods: {
    login: async function() {
      if (!this.userName) {
        return;
      }
      await this.client
        .login(this.getUser(), {}, (err, user) => {
          if (err != null) {
            console.log(err);
          } else {
            this.userToken = user.getToken();
            this.stream = this.fetchMessageStream()
          }
        })
    },
    sendMessage: async function() {
      if (!this.message) {
        return;
      }
      const message = new Message();
      message.setContent(this.message);
      message.setUser(this.getUser());

      await this.client
        .sendMessage(message, {}, (err, res) => {
          if (err != null) {
            console.log(err);
          }
        })
    },
    fetchMessageStream: function() {
      const stream = this.client.getMessage(this.getUser());
      stream.on('data', message => {
        console.log(message);
        this.messages = [...this.messages, message];
      });
      return stream;
    },
    getUser: function() {
      const user = new User();
      user.setName(this.userName);
      user.setToken(this.userToken);
      return user;
    }
  }
};
</script>

