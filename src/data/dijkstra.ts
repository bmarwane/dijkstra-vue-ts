import { NodeData, VisitState, TwoWaysLink } from "./Node";

export function findPath(
  nodes: NodeData[],
  links: TwoWaysLink[],
  startIndex: number,
  endIndex: number,
  recording: Boolean = true
): SearchResult {
  const scenario: Recording[] = [];

  // initialize start point with distance 0
  const distanceTable = nodes.map(n => new DistanceFromStartSummary(n));
  distanceTable[startIndex].shortestDistanceFromStart = 0;

  //const visitedNodes: NodeData[] = [];
  let unvisitedNodes: NodeData[] = [...nodes];
  let endNodeVisited: Boolean = false;

  // white still not arrived to end point
  let currentNode: NodeData | undefined;

  while (!endNodeVisited) {
    currentNode = getNextNode();
    if (!currentNode) {
      break;
    }

    record(currentNode, VisitState.processing);

    const nodeLinks = links.filter(
      fl => fl.pointA === currentNode || fl.pointB === currentNode
    );

    nodeLinks.forEach(link => {
      const summaryB: DistanceFromStartSummary | undefined = getSummaryForNode(
        link.pointB
      );
      if (!summaryB) return;

      const summaryA: DistanceFromStartSummary | undefined = getSummaryForNode(
        link.pointA
      );
      if (!summaryA) return;

      let toSummary: DistanceFromStartSummary;
      let fromSummary: DistanceFromStartSummary;

      if (currentNode === link.pointA) {
        fromSummary = summaryA;
        toSummary = summaryB;
      } else {
        fromSummary = summaryB;
        toSummary = summaryA;
      }

      record(fromSummary.node, VisitState.visiting);
      record(toSummary.node, VisitState.visiting);

      // calculate new distance for summary

      let newToDistance = link.weight + fromSummary.shortestDistanceFromStart;

      if (newToDistance < toSummary.shortestDistanceFromStart) {
        toSummary.shortestDistanceFromStart = newToDistance;

        if (currentNode) {
          toSummary.previousNode = currentNode;
        }
      }

      record(fromSummary.node, VisitState.visited);
      record(toSummary.node, VisitState.visited);
    });

    if (currentNode === nodes[endIndex]) {
      endNodeVisited = true;
      break;
    }

    unvisitedNodes.splice(
      unvisitedNodes.findIndex(n => n === currentNode),
      1
    );
  }

  const calculatedPath: NodeData[] | undefined = endNodeVisited
    ? buildPath()
    : undefined;

  function buildPath(): NodeData[] {
    const path: NodeData[] = [];
    let current: DistanceFromStartSummary | undefined = getSummaryForNode(
      nodes[endIndex]
    );

    while (current && current.node !== nodes[startIndex]) {
      record(current.node, VisitState.inpath);

      path.unshift(current.node);
      current = getSummaryForNode(current.previousNode);
      if (current && !current.previousNode) {
        record(current.node, VisitState.inpath);
        path.unshift(current.node);
      }
    }

    return path;
  }

  function getSummaryForNode(node: NodeData) {
    return distanceTable.find(nd => nd.node === node);
  }

  function getNextNode(): NodeData | undefined {
    //return unvisited  with smallest distance to A
    //const links: NodeLink = currentNode.links;

    return unvisitedNodes.reduce(
      (
        acc: NodeData | undefined,
        n: NodeData,
        index: number,
        all: NodeData[]
      ): NodeData | undefined => {
        const summaryForCurrent:
          | DistanceFromStartSummary
          | undefined = distanceTable.find(nd => nd.node === n);
        const summaryForPrevious: DistanceFromStartSummary | undefined = acc
          ? distanceTable.find(nd => nd.node === acc)
          : undefined;

        if (!summaryForPrevious && summaryForCurrent) {
          return summaryForCurrent.node;
        }

        if (summaryForCurrent && summaryForPrevious) {
          return summaryForCurrent.shortestDistanceFromStart <
            summaryForPrevious.shortestDistanceFromStart
            ? summaryForCurrent.node
            : summaryForPrevious.node;
        }

        return acc;
      },
      undefined
    );
  }

  function record(node: NodeData, visitState: VisitState) {
    if (!recording) return;
    scenario.push(new Recording(node, visitState));
  }

  return {
    recordings: scenario,
    path: calculatedPath
  };
}

class DistanceFromStartSummary {
  node!: NodeData;
  shortestDistanceFromStart!: number;
  previousNode!: NodeData;

  constructor(node: NodeData) {
    this.node = node;
    this.shortestDistanceFromStart = Infinity;
  }
}

export class Recording {
  target!: NodeData;
  newVisitState!: VisitState;

  constructor(target: NodeData, newVisitState: VisitState) {
    this.target = target;
    this.newVisitState = newVisitState;
  }
}

export interface SearchResult {
  recordings: Recording[];
  path: NodeData[] | undefined;
}
