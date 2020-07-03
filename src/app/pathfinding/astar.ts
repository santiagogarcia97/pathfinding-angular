import {NodeTypes, Node} from './types';

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
    updateUnvisitedNeighbours(closestNode, grid);
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

const updateUnvisitedNeighbours = (node: Node, grid: Node[][]): void => {
  const unvisitedNeighbours: Node[] = [];
  const { col, row } = node;

  if (col > 0)
  { unvisitedNeighbours.push(grid[row][col - 1]); }

  if (row > 0)
  { unvisitedNeighbours.push(grid[row - 1][col]); }

  if (col < grid[0].length - 1)
  { unvisitedNeighbours.push(grid[row][col + 1]); }

  if (row < grid.length - 1)
  { unvisitedNeighbours.push(grid[row + 1][col]); }

  for (const neighbour of unvisitedNeighbours) {
    if (neighbour.distance > node.distance + neighbour.weight) {
      neighbour.distance = node.distance + neighbour.weight;
      neighbour.previousNode = node;
    }
  }
};
