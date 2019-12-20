<template>
  <div>
    <table class="my-grid" @mousedown="draging=true" @mouseup="draging=false">
      <tbody>
        <tr v-for="(row, rowNum) in cells" :key="'row_' + rowNum">
          <Cell
            v-for="(col, colNum) in row"
            :key="'row_' + rowNum + '_col_' + colNum"
            :data="col"
            :draging="draging"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { NodeData } from "@/data/Node";

import Cell from "./Cell.vue";

@Component({
  components: { Cell }
})
export default class Grid extends Vue {
  @Prop()
  cells!: NodeData[][];

  draging: Boolean = false;
}
</script>

<style lang="scss">
table {
  user-select: none;
}
</style>
