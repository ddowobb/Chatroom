<template>
  <div class="create">
    <div class="create_main" v-if="!in_chat">
      <div class="title">Create a room</div>
      <div class="form">
        <div class="room_name">Name:</div>
        <input
          class="input"
          placeholder="input name"
          @keyup.enter="create_room"
          v-model="username"
        />
      </div>
      <button class="button" @click="create_room">Create</button>
    </div>
    <!-- Chat -->
    <Chat v-if="in_chat" :room_id="room_id" :name="username" />
  </div>
</template>

<script>
import Chat from "../components/Chat";
export default {
  name: "Create",
  components: {
    Chat,
  },
  data() {
    return {
      in_chat: false,
      username: "",
      room_id: "",
    };
  },
  methods: {
    create_room() {
      if (this.username.length > 0) {
        console.log("create", this.$socket);
        this.$socket.emit("create_room", this.username, (room_id, error) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log(room_id, this);
          this.room_id = room_id;
          this.in_chat = true;
        });
      } else {
        console.log("input error");
      }
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 50px;
  font-weight: bolder;
}

.create_main {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  width: 500px;
  height: 100px;
}

.input {
  border-radius: 20px;
  width: 250px;
  border-radius: 30px;
  border: 0;
  outline: none;
  padding-left: 10px;
  font-size: 20px;
}

.button {
  width: 120px;
  height: 30px;
  border: 0;
  border-radius: 30px;
  cursor: pointer;
  font-size: 20px;
  background-color: rgb(160, 166, 192);
}
</style>