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
import client from '../api/client.js'
import { Message, User } from '../proto/chat_pb'
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

export default {
  name: "Chat",
  data: () => ({
    userName: "",
    userToken: "",
    message: "",
    messages: [],
    stream: null,
  }),
  methods: {
    login: async function() {
      if (!this.userName) {
        return;
      }
      await client
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

      await client
        .sendMessage(message, {}, (err, res) => {
          if (err != null) {
            console.log(err);
          }
          this.message = '';
        })
    },
    fetchMessageStream: function() {
      const stream = client.getMessage(this.getUser());
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

