import {Node} from './types';

export const dijkstra = (grid, startX, startY, endX, endY, delay): void => {
  const visitedNodes: Node[] = [];

  const unvisitedNodes: Node[] = [];
  for (const row of grid){
    for (const node of row){
      unvisitedNodes.push(node);
    }
  }

  while (unvisitedNodes.length) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);

    const closestNode = unvisitedNodes.shift();
    if (closestNode.distance === Infinity) { break; }

    closestNode.visited = true;
    visitedNodes.push(closestNode);

    if (closestNode.row  === endX && closestNode.col === endY) { break; }
    updateUnvisitedNeighbours(closestNode, grid);
  }

  let count = 1;
  for (const node of visitedNodes){
    setTimeout(() => {
      if (node.row === startX && node.col === startY) { return; }
      if (node.row === endX && node.col === endY) { return; }
      grid[node.row][node.col].color = 'red';
    }, delay * count);
    count++;
  }

  const shortestPath = [];
  let currentNode = visitedNodes.pop();
  while (currentNode !== null) {
    shortestPath.unshift(currentNode);
    if (!currentNode.previousNode) { break; }
    currentNode = currentNode.previousNode;
  }

  for (const node of shortestPath){
    setTimeout(() => {
      if (node.row === startX && node.col === startY) { return; }
      if (node.row === endX && node.col === endY) { return; }
      grid[node.row][node.col].color = 'darkcyan';
    }, delay * count);
    count++;
  }
};

const updateUnvisitedNeighbours = (node, grid): void => {
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
