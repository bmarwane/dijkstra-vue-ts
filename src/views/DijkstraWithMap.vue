<template>
  <div class="demopage">
    <div class="demo-map">
      <Visualizer
        :key="'res'+version"
        :nodes="nodes"
        :links="links"
        :foundPath="foundPath"
        :startingNode="startingNode"
        :endNode="endNode"
        @recordingEnd="searching=false"
        @nodeClick="onNodeClick"
      />
      <div class="actions">
        <button
          class="btn btn-success btn-block mt-2"
          :disabled="searching || !this.startingNode || !this.endNode"
          @click="searchPath"
        >GO</button>
      </div>
    </div>
    <div class="readme">
      <h3>Algorithme de Dijkstra</h3>
      <p>Exemple d'implémentation avec Vue et Typescript</p>

      <div class="alert alert-primary" role="alert">
        <ul class="list-unstyled">
          <li>cliquez sur les liens entre les nœuds pour changer le type de routes</li>
          <li>Cliquez sur deux noeuds pour tester l'algorithme</li>
        </ul>
      </div>

      <hr />

      <h4>Code couleurs des liens</h4>

      <p>le lien entre deux noeuds porte un poid, pour cet exemple le lien entre 2 noeuds représente une route entre deux points dans une carte</p>
      <p>On a dans cet exemple 3 types de "routes"</p>
      <ul class="list-unstyled routes-info">
        <li>
          <span class="normal_route">&nbsp;</span> Trafic normal ( poids = 1)
        </li>
        <li>
          <span class="road_construction_route"></span> Travaux sur la route ( poids = 3)
        </li>
        <li>
          <span class="crowded_route"></span> Embouteillage sur la route ( poids = 5)
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import Visualizer from "../components/Visualizer.vue";
import { NodeData, TwoWaysLink } from "../data/Node";
import { findPath, Recording, SearchResult } from "../data/dijkstra";

@Component({
  components: {
    Visualizer
  }
})
export default class DijkstraWithMap extends Vue {
  nodes: NodeData[] = [];
  links: TwoWaysLink[] = [];
  path: NodeData[] = [];
  foundPath: SearchResult | null;
  version: number = 0;

  tmpNodes: NodeData[] | undefined = undefined;
  tmpPoints: any[] = [];

  startingNode: NodeData | null = null;
  endNode: NodeData | null = null;

  searching: Boolean = false;

  constructor() {
    super();
    this.foundPath = null;
  }

  mounted() {
    this.foundPath = null;
    this.version = 1;
    this.prepareExampleData();
  }

  onNodeClick(node: NodeData) {
    if (node === this.startingNode) {
      this.startingNode = null;
      return;
    }

    if (node === this.endNode) {
      this.endNode = null;
      return;
    }

    if (!this.startingNode) {
      this.startingNode = node;
      return;
    }

    if (!this.endNode) {
      this.endNode = node;
      return;
    }

    if (this.startingNode && this.endNode) {
      this.startingNode = node;
      this.endNode = null;
    }
  }

  searchPath() {
    if (!this.startingNode || !this.endNode) return;

    this.searching = true;
    this.foundPath = findPath(
      this.nodes,
      this.links,
      this.startingNode.index,
      this.endNode.index
    );
    this.version += 1;
  }

  prepareExampleData() {
    this.tmpNodes = [];
    let nextNode!: NodeData;

    const points: Array<any> = [
      //*
      [44, 37],
      [125, 283],
      [105, 37],
      [178, 257],
      [265, 32],
      [323, 213],
      [372, 36],
      [431, 187],
      [547, 42],
      [562, 173],
      [608, 38],
      [599, 170],
      [240, 244],
      [299, 406],
      [180, 469],
      [427, 383],
      [538, 373],
      [504, 182],
      [585, 368]
      //*/
    ];

    // Links

    // format: from,to,weight
    const links: Array<[number, number, number]> = [
      //*
      [0, 1, 1],
      [0, 2, 1],
      [2, 4, 1],
      [2, 3, 3],
      [1, 3, 1],
      [3, 12, 1],
      [12, 5, 1],
      [4, 5, 1],
      [4, 6, 5],
      [5, 7, 1],
      [6, 7, 3],
      [6, 8, 1],
      [7, 17, 5],
      [8, 9, 1],
      [8, 10, 1],
      [17, 9, 1],
      [10, 11, 1],
      [9, 11, 1],
      [1, 14, 5],
      [14, 13, 1],
      [12, 13, 1],
      [13, 15, 1],
      [15, 16, 3],
      [17, 16, 1],
      [16, 18, 1],
      [11, 18, 1]
      //*/
    ];

    points.forEach((p, index) => {
      if (this.tmpNodes) {
        this.tmpNodes.push(new NodeData(p[0], p[1], index));
      }
    });

    this.nodes = this.tmpNodes;

    links.forEach(l => {
      this.linkTwoPoints(l[0], l[1], l[2]);
    });

    delete this.tmpNodes;
  }

  linkTwoPoints(from: number, to: number, weight: number) {
    const twoWaysLink = new TwoWaysLink();

    twoWaysLink.pointA = this.nodes[from];
    twoWaysLink.pointB = this.nodes[to];
    twoWaysLink.weight = weight;

    this.links.push(twoWaysLink);
  }
}
</script>

<style lang="scss" scoped>
.demopage {
  display: flex;

  touch-action: manipulation;
  .readme {
    padding: 1rem;
    font-size: 0.8rem;
    max-width: 500px;
  }

  .demo-map {
    width: 664px;

    .root {
      height: 524px;
    }
  }
}

@media screen and (max-width: 1099px) {
  .demopage {
    flex-flow: column wrap;
  }
}

.routes-info {
  li {
    margin-bottom: 0.8rem;
  }
  span {
    padding: 1px 16px;
    margin-right: 8px;
    &.normal_route {
      background-color: $normal-route-color;
    }
    &.road_construction_route {
      background-color: $repair-route-color;
    }
    &.crowded_route {
      background-color: $crowded-route-color;
    }
  }
}
</style>