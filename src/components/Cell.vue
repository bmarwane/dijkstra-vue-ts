<template>
  <td @mouseover="onMouseDown" @mousedown="walled = true" :class="{walled}"></td>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NodeData } from "@/data/Node";

@Component
export default class Cell extends Vue {
  @Prop()
  data!: NodeData;

  @Prop()
  draging: Boolean = false;

  hover: Boolean = false;
  walled: Boolean = false;

  onMouseDown() {
    if (this.draging) {
      this.walled = true;
    }
  }
}
</script>

<style lang="scss" scoped>
$hoverColor: blue;

td {
  border: 1px solid gray;
  padding: 0.5rem;

  &:hover {
    background: $hoverColor;
  }

  &.walled {
    background: black !important;
  }
}
</style>