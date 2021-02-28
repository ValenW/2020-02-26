<template>
  <div class="stage">
    <div class="title">{{ stage.title }}</div>
    <div class="jobs-containner">
      <div
        :class="{ edge: true, head: stage.jobs.length > 0 }"
        v-if="!head"
      ></div>
      <div class="jobs-wrapper">
        <Job
          v-for="(job, index) of stage.jobs"
          class="job-item"
          :key="index"
          :job="job"
          :head="head"
          :tail="tail"
        />
      </div>
      <div
        :class="{ edge: true, tail: stage.jobs.length > 0 }"
        v-if="!tail"
      ></div>
    </div>
  </div>
</template>

<script>
import Job from "./Job.vue";

export default {
  name: "Stage",
  components: {
    Job,
  },
  props: {
    stage: Object,
    head: Boolean,
    tail: Boolean,
  },
};
</script>

<style>
.stage {
  display: flex;
  flex-direction: column;
}
.title {
  text-align: start;
  margin-left: 10px;
  font-weight: bolder;
}
.jobs-containner {
  display: flex;
  flex-direction: row;
}
.job-item {
  margin: 5px 0;
}
.edge {
  border-top: solid black 1px;
  width: 5px;
  margin-top: 25.5px;
  margin-bottom: 26px;
}
.edge.head {
  border-right: solid black 1px;
}
.edge.tail {
  border-left: solid black 1px;
}
</style>