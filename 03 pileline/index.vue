<template>
  <div class="pipeline">
    <Stage
      v-for="(stage, index) of pipeline.stages"
      :key="index"
      :stage="stage"
      :head="index === 0"
      :tail="index === pipeline.stages.length - 1"
    ></Stage>
  </div>
</template>

<script>
import Stage from "./Stage.vue";

export default {
  name: "Pipline",
  components: {
    Stage,
  },
  props: {
    pipeline: Object,
  },
};
</script>

<style lang="css">
.pipeline {
  display: flex;
  flex-direction: row;
}
.text-ellipsis {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>