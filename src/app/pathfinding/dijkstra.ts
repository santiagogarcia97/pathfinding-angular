import {Node} from './types';

export const dijkstra = (grid: Node[][], startNode: Node, endNode: Node): Node[] => {
  const visitedNodes: Node[] = [];

  const unvisitedNodes: Node[] = [];
  for (const row of grid){
    for (const node of row){
      unvisitedNodes.push(node);
    }
  }

  while (unvisitedNodes.length) {
    sortUnvisited(unvisitedNodes, startNode);

    const closestNode = unvisitedNodes.shift();
    // If endNode is unreachable => break
    if (closestNode.distance === Infinity) { break; }

    closestNode.visited = true;
    visitedNodes.push(closestNode);

    // If endNode is reached => break
    if (closestNode.row  === endNode.row && closestNode.col === endNode.col) { break; }
    updateUnvisitedNeighbours(closestNode, grid);
  }

  return visitedNodes;
};

// TODO REFACTOR THIS FUNC
const sortUnvisited = (unvisitedNodes: Node[], startNode: Node): void => {
  unvisitedNodes.sort((nodeA, nodeB) => {
    if (nodeA.distance === nodeB.distance){
      let nodeAQuadrant = 0;
      let nodeBQuadrant = 0;

      if (nodeA.row < startNode.row && nodeA.col <= startNode.col) { nodeAQuadrant = 1; }
      if (nodeA.row >= startNode.row && nodeA.col < startNode.col) { nodeAQuadrant = 2; }
      if (nodeA.row > startNode.row && nodeA.col >= startNode.col) { nodeAQuadrant = 3; }
      if (nodeA.row <= startNode.row && nodeA.col > startNode.col) { nodeAQuadrant = 4; }

      if (nodeB.row < startNode.row && nodeB.col <= startNode.col) { nodeBQuadrant = 1; }
      if (nodeB.row >= startNode.row && nodeB.col < startNode.col) { nodeBQuadrant = 2; }
      if (nodeB.row > startNode.row && nodeB.col >= startNode.col) { nodeBQuadrant = 3; }
      if (nodeB.row <= startNode.row && nodeB.col > startNode.col) { nodeBQuadrant = 4; }

      return nodeBQuadrant - nodeAQuadrant;
    }
    return nodeA.distance - nodeB.distance;
  });
};

const updateUnvisitedNeighbours = (node: Node, grid: Node[][]): void => {
  const unvisitedNeighbours = [];
  const { col, row } = node;

  if (col > 0 && !grid[row][col - 1].visited )
    { unvisitedNeighbours.push(grid[row][col - 1]); }

  if (row > 0 && !grid[row - 1][col].visited)
    { unvisitedNeighbours.push(grid[row - 1][col]); }

  if (col < grid[0].length - 1 && !grid[row][col + 1].visited)
    { unvisitedNeighbours.push(grid[row][col + 1]); }

  if (row < grid.length - 1 && !grid[row + 1][col].visited)
    { unvisitedNeighbours.push(grid[row + 1][col]); }

  for (const neighbour of unvisitedNeighbours) {
    neighbour.distance = node.distance + 1;
    neighbour.previousNode = node;
  }
};

export const getShortestPath = (visitedNodes: Node[]): Node[] => {
  const shortestPath = [];
  let currentNode = visitedNodes.pop();
  while (currentNode !== undefined) {
    shortestPath.unshift(currentNode);
    if (!currentNode.previousNode) { break; }
    currentNode = currentNode.previousNode;
  }
  return shortestPath;
};

