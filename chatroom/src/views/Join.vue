<template>
  <div class="join" v-if="$route.params.room_id">
    <div class="main" v-if="!in_chat">
      <div class="title">Join a room</div>
      <div class="form">
        <div class="func">
          <div class="room_name">Name:</div>
          <input
            class="input"
            placeholder="input name"
            @keyup.enter="start_chat"
            v-model="name"
          />
        </div>
      </div>
      <button class="button" @click="start_chat">Join</button>
    </div>
    <!-- Chat -->
    <Chat v-if="in_chat" :room_id="$route.params.room_id" :name="name" />
  </div>
  <div class="error" v-else>
    Room Id is required.
    <span><router-link to="/">Create A Room</router-link></span>
  </div>
</template>

<script>
import Chat from "../components/Chat";
export default {
  name: "Join",
  components: {
    Chat,
  },
  data() {
    return {
      in_chat: false,
      name: "",
    };
  },
  methods: {
    start_chat() {
      if (this.name.length > 0 && this.$route.params.room_id.length > 0) {
        this.in_chat = true;
      }
    },
  },
  updated() {
    console.log(this.$route.params.room_id);
  },
};
</script>
<style scoped>
.title {
  font-size: 50px;
  font-weight: bolder;
}

.main {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.func {
  display: flex;
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