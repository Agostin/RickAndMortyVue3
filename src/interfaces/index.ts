interface EnrichedElement {
  name: string;
  url: string
}

interface ApiPaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: EnrichedElement;
  location: EnrichedElement;
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  'air_date': string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string
}

export interface RMApiResponse {
  info: ApiPaginationInfo;
  results: Character[]
}
