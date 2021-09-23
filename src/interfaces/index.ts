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

export interface RMCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: EnrichedElement,
  location: EnrichedElement,
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

export interface RMApiResponse {
  info: ApiPaginationInfo;
  results: RMCharacter[]
}
