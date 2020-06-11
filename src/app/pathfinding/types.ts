export interface Node {
  row: number;
  col: number;
  color?: string;
  distance?: number;
  visited?: boolean;
  previousNode?: Node;
}
