export interface Asset {
  id: number;
  name: string;
  type: string;
  status: 'OPERATIONAL' | 'OUT_OF_SERVICE' | 'MAINTENANCE';
}

export interface Sector {
  id: number;
  name: string;
  assets: Asset[];
}

export interface Floor {
  id: number;
  name: string;
  sectors: Sector[];
}

export interface Building {
  id: number;
  name: string;
  floors: Floor[];
}

export interface Hospital {
  id: number;
  name: string;
  buildings: Building[];
}
