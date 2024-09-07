export type Company = {
    id: number;
    name: string;
    avatarUrl: string;
    isOwner: boolean;
    isCurrent: boolean;
    isDefault: boolean;
};

export interface NodeData {
    key: string;
    label: string;
    tag: string;
    URL: string;
    cluster: string;
    x: number;
    y: number;
  }
  
  export interface Cluster {
    key: string;
    color: string;
    clusterLabel: string;
  }
  
  export interface Tag {
    key: string;
    image: string;
  }
  
  export interface Dataset {
    nodes: NodeData[];
    edges: [string, string][];
    clusters: Cluster[];
    tags: Tag[];
  }
  
  export interface FiltersState {
    clusters: Record<string, boolean>;
    tags: Record<string, boolean>;
  }