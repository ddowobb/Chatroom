<template>
  <div
    class="main_message"
    :class="[message.type, { from_self: message.from_self }]"
  >
    <div class="message_text">
      {{ message.message }}
      <div class="detail">from {{ message.sender }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Message",
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.main_message {
  display: flex;
  align-items: flex-start;
  margin: 5px;
  font-size: 15px;
  width: fit-content;
  word-break: break-all;
  text-align: left;
  background-color: #e6e6e6;
  border-radius: 20px;
  padding: 15px;
}

.message_text {
  display: flex;
  justify-content: space-around;
  font-size: 17px;
}

.detail {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5px;
  margin-left: 10px;
  font-size: 13px;
  white-space: nowrap;
}

.main_message.system {
  color: rgb(45, 87, 124);
  font-weight: bold;
}
.main_message.message {
  color: rgb(0, 0, 0);
}
.main_message.error {
  color: rgb(255, 16, 16);
}

.main_message.from_self {
  align-self: flex-end;
  background-color: #80ff95;
}
</style>