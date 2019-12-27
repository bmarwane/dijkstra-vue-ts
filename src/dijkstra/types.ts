export class NodeData {
  index: number;
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number, index: number) {
    this.x = x;
    this.y = y;
    this.index = index;
  }
}

export class TwoWaysLink {
  pointA!: NodeData;
  pointB!: NodeData;
  weight: number = 1;
  visitState: VisitState = VisitState.unvisited;
}

export enum VisitState {
  unvisited = "unvisited",
  visited = "visited",
  visiting = "visiting",
  processing = "processing",
  inpath = "inpath"
}
