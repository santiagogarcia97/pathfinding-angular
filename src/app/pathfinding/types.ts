export enum Animation {
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
  animation: Animation;
  distance?: number;
  visited?: boolean;
  previousNode?: Node;
}
