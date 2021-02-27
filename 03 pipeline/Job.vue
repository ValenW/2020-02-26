<template>
  <div class="job-wrapper">
    <div :class="{ line: true, solid: !head }"></div>
    <div class="job">
      <div class="status text-ellipsis">{{ job.status }}</div>
      <div class="name text-ellipsis">{{ job.name }}</div>
      <div class="duration">{{ duration }}</div>
    </div>
    <div :class="{ line: true, solid: !tail }"></div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    job: Object,
    head: Boolean,
    tail: Boolean,
  },
  computed: {
    duration: function () {
      return moment.utc(this.job.time).format("HH:mm:ss");
    },
  },
};
</script>

<style lang="css" scoped>
.job-wrapper {
  display: flex;
  align-items: center;
}
.job {
  display: flex;
  height: 40px;
  border: solid black 1px;
  border-radius: 20px;
  padding: 0 10px;
  align-items: center;
  width: 200px;
}
.status {
  flex: 0 0 20px;
}
.name {
  flex: 1 0 20px;
}
.duration {
  margin: 0 20px;
}
.line {
  border-top: solid rgba(0, 0, 0, 0) 1px;
  height: 0;
  width: 20px;
}
.line.solid {
  border-top: solid rgba(0, 0, 0, 100) 1px;
}
</style>
