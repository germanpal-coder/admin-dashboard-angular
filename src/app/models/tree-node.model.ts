export interface TreeNode {
  id: number;
  name: string;
  type: 'HOSPITAL' | 'BUILDING' | 'FLOOR' | 'SECTOR';
  children?: TreeNode[];
}
