import {Node} from '../types';

export const updateNeighbours = (node: Node, grid: Node[][]): void => {
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
