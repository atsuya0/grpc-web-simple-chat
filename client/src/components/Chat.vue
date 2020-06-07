<template>
  <section>
    <form v-if="!userToken" class="name-input">
      <input v-model="userName" />
      <button @click="login">名前を入力</button>
    </form>
    <div v-else>
      <ul class="messages">
        <li
          v-for="message of messages"
          class="message"
        >
          <div
            class="user-name"
            :class="{ myMessage: userToken === message.getUser().getToken() }"
          >
            {{ message.getUser().getName() }}
          </div>
          <div class="content" >
            {{ message.getContent() }}
          </div>
          <div class="posted-at">
            {{ message.getCreatedAt() | toLocaleString }}
          </div>
        </li>
      </ul>
      <form class="message-input">
        <input v-model="message" />
        <button @click="sendMessage">送信</button>
      </form>
    </div>
  </section>
</template>

<script>
import client from '../api/client.js'
import { Message, User } from '../proto/chat_pb'
// import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

export default {
  name: "Chat",
  data: () => ({
    userName: "",
    userToken: "",
    message: "",
    messages: [],
    stream: null,
  }),
  filters: {
    toLocaleString: (value) => {
      return (new Date(value.getSeconds() * 1000)).toLocaleString()
    }
  },
  methods: {
    login: async function(e) {
      e.preventDefault();
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
    sendMessage: async function(e) {
      e.preventDefault();
      if (!this.message) {
        return;
      }
      const message = new Message();
      message.setContent(this.message);
      message.setUser(this.getUser());
      const timestamp = new Timestamp();
      timestamp.fromDate(new Date());
      message.setCreatedAt(timestamp);

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

<style scoped>
.name-input, .message-input {
  text-align: center;
}

.messages {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.message {
  margin-bottom: 1rem;
  width: 70%;
  min-width: 20rem;
}

.content {
  font-size: 110%;
  padding: 0.5rem 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.user-name {
  font-size: 85%;
  padding: 0 0 0.3rem 0.3rem;
}

.posted-at {
  font-size: 85%;
  padding: 0 0 0.3rem 0.3rem;
}

.myMessage {
  font-weight: bold;
}
</style>
