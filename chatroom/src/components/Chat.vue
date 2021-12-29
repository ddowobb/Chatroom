<template>
  <div class="chat">
    <div class="copy_func">
      <div class="id">The room id is {{ room_id }}</div>
      <button class="copy_button" @click="copy">Copy ID</button>
    </div>
    <div class="message_block">
      <div class="message">
        <Message
          v-for="message in messages"
          :key="message"
          :message="message"
        />
      </div>
    </div>
    <div class="form">
      <div class="room_name">Message:</div>
      <input
        class="input"
        placeholder="input message"
        v-model="newMessage"
        @keyup.enter="send"
      />
      <button class="button" @click="send" :disabled="!activated">Send</button>
    </div>
  </div>
</template>

<script>
import Message from "../components/Message";
import MsgType from "./MsgType.js";
export default {
  name: "Chat",
  props: {
    room_id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  components: {
    Message,
  },
  data() {
    return {
      newMessage: "",
      messages: [],
      activated: false,
      joined_room_id: null,
      preview: null,
      image: null,
    };
  },
  mounted() {
    this.$socket.on("connect", () => {
      this.join_room();
    });
    this.$socket.on("disconnect", () => {
      this.show_sys_message("disconnected");
      this.activated = false;
    });
    this.$socket.on("message", (message_payload) => {
      this.add_new_message(message_payload, false);
    });
    this.join_room();
  },
  updated() {
    if (this.joined_room_id != this.room_id) {
      this.leave_room(), this.join_room();
    }
  },
  methods: {
    copy() {
      const join_url = location.origin + "/#/join/" + this.room_id;
      // const join_url = `${location.origin}/#/join/${this.room_id}`;
      this.$copyText(join_url);
      console.log(join_url);
    },

    send() {
      console.log("send message");
      if (this.newMessage.length > 0) {
        this.$socket.emit(
          "send_message",
          this.room_id,
          this.newMessage,
          (sent_message_payload, error) => {
            if (error) {
              this.show_error(error);
            } else {
              this.add_new_message(sent_message_payload, true);
              this.newMessage = "";
            }
          }
        );
      } else {
        console.log("input error");
        return;
      }
    },

    join_room() {
      if (this.room_id == "" || this.name == "" || this.activated) return;
      this.$socket.emit(
        "join_room",
        this.room_id,
        this.name,
        (_response, error) => {
          if (error) {
            this.show_error(error);
            this.activated = false;
            return;
          }
          this.show_sys_message(`joined room: ${this.room_id}`);
          this.joined_room_id = this.room_id;
          this.activated = true;
        }
      );
    },

    leave_room() {
      if (this.activated) {
        this.$socket.emit("leave_room", this.joined_room_id, () => {
          this.activated = false;
          this.show_sys_message("left room");
        });
      }
    },

    show_sys_message(message) {
      // push the system's message, like joined room
      this.messages.push({
        message: message,
        sender: "system",
        type: MsgType.system,
        from_self: true,
      });
    },

    add_new_message(message, from_self) {
      // push the user's chat message
      this.messages.push({
        message: message.message,
        sender: message.from.name,
        type: MsgType.message,
        from_self: from_self,
      });
    },

    show_error(error) {
      // push the system's error message
      this.messages.push({
        message: error.message,
        sender: "system",
        type: MsgType.error,
        from_self: true,
      });
    },
  },
  beforeUnmount() {
    this.leave_room();
  },
};
</script>
<style scoped>
.chat {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(151, 151, 151, 0.39);
  width: 120%;
  height: 80vh;
  border-radius: 50px;
  padding: 10px;
}

.copy_func {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.id {
  font-size: 17px;
  font-weight: bold;
  color: rgb(28, 29, 99);
}

.copy_button {
  margin-left: 15px;
  width: 80px;
  height: 30px;
  border: 0;
  outline: none;
  border-radius: 20px;
  cursor: pointer;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #313131;
}

.room_name {
  color: rgb(56, 56, 56);
  font-weight: bold;
  margin-right: 5px;
}

.input {
  border-radius: 20px;
  width: 280px;
  height: 30px;
  border-radius: 30px;
  border: 0;
  outline: none;
  padding-left: 10px;
  font-size: 15px;
}

.button {
  width: 90px;
  height: 30px;
  border: 0;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 5px;
}

.message_block {
  height: 600px;
  width: 500px;
  overflow: auto;
}

.message {
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  padding: 15px;
}
</style>
