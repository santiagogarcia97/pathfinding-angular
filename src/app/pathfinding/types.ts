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
  weight?: number;
  distance?: number;
  visited?: boolean;
  previousNode?: Node;
}

export enum GridType {
  Unweighted = 'Unweighted',
  Weighted =  'Weighted'
}

