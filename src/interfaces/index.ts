interface ApiPaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Episode {
  id?: number;
  name?: string;
  'air_date'?: string;
  episode?: string;
  characters?: string[];
  url: string;
  created?: string;
}

export interface Location {
  id?: number;
  name: string;
  type?: string;
  dimension?: string;
  residents?: string[];
  url: string;
  created?: string
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string
  };
  location: Location;
  image: string;
  episode: Array<string> | Array<Episode>;
  url: string;
  created: string;
}

export interface RMApiResponse {
  info: ApiPaginationInfo;
  results: Character[]
}
