import {NodeTypes, Node} from '../types';
import {updateNeighbours} from './updateNeighbours';

export const astar = (grid: Node[][], startNode: Node, endNode: Node): Node[] => {
  const visitedNodes: Node[] = [];

  const unvisitedNodes: Node[] = [];
  for (const row of grid){
    for (const node of row){
      node.distance = (node.row === startNode.row && node.col === startNode.col) ? 0 : Infinity;
      node.h = Math.abs(node.col - endNode.col) + Math.abs(node.row - endNode.row);
      unvisitedNodes.push(node);
    }
  }
  console.log(grid);

  while (unvisitedNodes.length) {
    sortUnvisited(unvisitedNodes);

    const closestNode = unvisitedNodes.shift();
    // If endNode is unreachable => break
    if (closestNode.distance === Infinity) { break; }
    if (closestNode.type === NodeTypes.Wall) { continue; }

    closestNode.visited = true;
    visitedNodes.push(closestNode);

    // If endNode is reached => break
    if (closestNode.row  === endNode.row && closestNode.col === endNode.col) { break; }
    updateNeighbours(closestNode, grid);
  }

  return visitedNodes;
};

const sortUnvisited = (unvisitedNodes: Node[]): void => {
  unvisitedNodes.sort((nodeA, nodeB) => {
    if (nodeA.distance + nodeA.h === nodeB.distance + nodeB.h){
      return nodeA.h - nodeB.h;
    }
    return nodeA.distance + nodeA.h - nodeB.distance - nodeB.h;
  });
};
