<template>
  <div class="stage">
    <div class="title">{{ stage.title }}</div>
    <Job
      v-for="(job, index) of stage.jobs"
      class="job-item"
      :key="index"
      :job="job"
      :head="head"
      :tail="tail"
    />
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
.job-item {
  margin: 5px 10px;
}
</style>