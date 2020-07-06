export enum NodeTypes {
  Clear,
  Visited,
  Path,
  Wall,
  Start,
  End,
}

export interface Node {
  row: number;
  col: number;
  type: NodeTypes;
  weight?: number;
  distance?: number;
  h?: number;
  visited?: boolean;
  previousNode?: Node;
}

