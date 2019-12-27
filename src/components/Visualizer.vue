<template>
  <div class="root">
    <div
      class="node"
      :class="`${isPlayingRecording ? '': 'clickable'} ${getNodeColor(node)}`"
      v-for="(node, index) in nodes"
      :key="`node_${node.x}_${node.y}`"
      :ref="`node_${node.x}_${node.y}`"
      :style="{left: `${node.x - 8}px`, top: `${node.y- 8}px`}"
      @click="() => $emit('nodeClick', node)"
    >
      <span>{{index}}</span>
    </div>
    <div
      class="line"
      :class="`${link.visitState} ${getWeightState(link)} link_${link.pointA.x}_${link.pointA.y}_${link.pointB.x}_${link.pointB.y}`"
      @click="() => rotateWeight(link)"
      v-for="(link) in links"
      :key="`link_${link.pointA.x}_${link.pointA.y}_${link.pointB.x}_${link.pointB.y}`"
      :ref="`link_${link.pointA.x}_${link.pointA.y}_${link.pointB.x}_${link.pointB.y}`"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { NodeData, VisitState, TwoWaysLink } from "../dijkstra/types";

import { adjustLine } from "./utils";
import { SearchResult, Recording } from "../dijkstra/dijkstra";

function waitForIt(ms: number): Promise<number> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component
export default class Visualizer2 extends Vue {
  @Prop()
  nodes!: NodeData[];

  @Prop()
  links!: TwoWaysLink[];

  @Prop()
  foundPath!: SearchResult | undefined;

  @Prop()
  startingNode!: NodeData | null;

  @Prop()
  endNode!: NodeData | null;

  isPlayingRecording: Boolean = false;

  mounted() {
    // orient line angles

    this.links.forEach(link => {
      adjustLine(
        (this.$refs[
          `node_${link.pointA.x}_${link.pointA.y}`
        ] as HTMLElement[])[0],
        (this.$refs[
          `node_${link.pointB.x}_${link.pointB.y}`
        ] as HTMLElement[])[0],
        (this.$refs[
          `link_${link.pointA.x}_${link.pointA.y}_${link.pointB.x}_${link.pointB.y}`
        ] as HTMLElement[])[0]
      );
    });

    setTimeout(async () => {
      this.isPlayingRecording = true;
      await this.playRecording();
      this.$emit("recordingEnd");
      this.isPlayingRecording = false;
    });
  }

  getNodeColor(node: NodeData) {
    if (node === this.startingNode) {
      return "starting-node";
    }

    if (node === this.endNode) {
      return "end-node";
    }

    return "";
  }

  rotateWeight(link: TwoWaysLink) {
    const weightClasses = [
      { value: 1, css: "normal" },
      { value: 3, css: "roadRepairs" },
      { value: 5, css: "crowded" }
    ];

    const myCssClassIndex = weightClasses.findIndex(
      w => w.value === link.weight
    );

    const newWeightCss = weightClasses[(myCssClassIndex + 1) % 3];

    link.weight = newWeightCss.value;
  }

  getWeightState(link: TwoWaysLink) {
    if (link.weight === 1) {
      return "normal";
    }
    if (link.weight === 3) {
      return "roadRepairs";
    }
    if (link.weight === 5) {
      return "crowded";
    }
  }

  async playRecording() {
    if (!this.foundPath) return;

    const setOnRefNode = (node: NodeData, visit: VisitState) => {
      const targetDomElem = this.$refs[`node_${node.x}_${node.y}`] as Element[];

      targetDomElem[0].className = `node ${visit}`;
    };

    const setOnRefLink = (
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      visit: VisitState
    ) => {
      // links are bi directional so we need to check for the two ways
      let linkRef = this.$refs[
        `link_${fromX}_${fromY}_${toX}_${toY}`
      ] as Element[];

      if (!linkRef) {
        linkRef = this.$refs[
          `link_${toX}_${toY}_${fromX}_${fromY}`
        ] as Element[];
      }

      linkRef[0].className = `line ${visit}`;
    };

    for (let i = 0; i < this.foundPath.recordings.length; i++) {
      const current = this.foundPath.recordings[i] as Recording;
      if (current.target instanceof NodeData) {
        setOnRefNode(current.target, current.newVisitState);
        await waitForIt(10);
      }
    }

    if (!this.foundPath.path) return;

    for (let i = 0; i < this.foundPath.path.length; i++) {
      const current = this.foundPath.path[i];
      const previous = this.foundPath.path[i - 1];
      const next = this.foundPath.path[i + 1];

      if (previous) {
        setOnRefLink(
          previous.x,
          previous.y,
          current.x,
          current.y,
          VisitState.inpath
        );
      }
      await waitForIt(30);
    }
  }
}
</script>

<style lang="scss" scoped>
.root {
  background-image: url("../assets/gmap.png");
}

.node {
  width: 16px;
  height: 16px;
  position: absolute;
  border-radius: 50%;
  display: inline-block;
  font-size: 0.6rem;
  font-weight: 800;
  color: white;
  z-index: 2;
  background-color: gray;

  &.clickable:hover {
    transform: scale(1.5);
    cursor: pointer;
  }

  &.starting-node {
    background: green;
  }

  &.end-node {
    background: red;
  }

  span {
    position: relative;
    left: 4px;
    bottom: 0;
  }
}

.line {
  position: absolute;
  width: 2px;
  margin-top: -1px;
  z-index: 1;
  &.visited,
  &.visiting {
    z-index: 1 !important;
  }

  &.inpath {
    width: 4px;
  }

  &:hover {
    width: 5px;
  }

  &.roadRepairs {
    background-color: $repair-route-color;
  }

  &.crowded {
    background-color: $crowded-route-color;
  }
}

.unvisited {
  background-color: $normal-route-color;
}

.visited {
  background-color: $node-visited;
}

.processing {
  background-color: $node-processing;
}

.visiting {
  background-color: $node-visiting;
}

.inpath {
  background-color: $node-inpath;
}
</style>