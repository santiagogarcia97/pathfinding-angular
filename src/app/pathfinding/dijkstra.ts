import {NodeTypes, Node} from './types';

export const dijkstra = (grid: Node[][], startNode: Node, endNode: Node): Node[] => {
  const visitedNodes: Node[] = [];

  const unvisitedNodes: Node[] = [];
  for (const row of grid){
    for (const node of row){
      node.distance = (node.row === startNode.row && node.col === startNode.col) ? 0 : Infinity;
      unvisitedNodes.push(node);
    }
  }

  while (unvisitedNodes.length) {
    sortUnvisited(unvisitedNodes, startNode);

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

const sortUnvisited = (unvisitedNodes: Node[], startNode: Node): void => {
  unvisitedNodes.sort((nodeA, nodeB) => {
    if (nodeA.distance === nodeB.distance){

      // Makes the clockwise animation
      const getQuadrant = (node: Node): number => {
        if (node.row < startNode.row && node.col <= startNode.col) { return 1; }
        if (node.row >= startNode.row && node.col < startNode.col) { return 2; }
        if (node.row > startNode.row && node.col >= startNode.col) { return 3; }
        if (node.row <= startNode.row && node.col > startNode.col) { return 4; }
      };
      return getQuadrant(nodeB) - getQuadrant(nodeA);
    }
    return nodeA.distance - nodeB.distance;
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

