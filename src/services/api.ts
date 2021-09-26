/* eslint-disable space-before-function-paren */
import { RMApiResponse, Character, Episode, Location } from '@/interfaces'
import axios, { AxiosError, AxiosResponse } from 'axios'

const basePath = 'https://rickandmortyapi.com/api'

export function getCharacters(page = 1): Promise<RMApiResponse | string> {
  return axios
    .get(`${basePath}/character/?page=${page}`)
    .then((res: AxiosResponse) => {
      return res.data as RMApiResponse
    })
    .catch((err: AxiosError) => {
      return err.code as string
    })
}

// function _serializeFilters(objFilter: Record<string, string>) {
//   if (typeof objFilter === 'object') {
//     return new URLSearchParams(objFilter).toString()
//   } else {
//     return objFilter
//   }
// }

// export function getCharacterById(chId: number, filters?: Record<string, string>): Promise<Character | string> {
//   let apiPath = `${basePath}/character/${chId}`
//   let chFilters = ''
//   if (filters) {
//     chFilters = _serializeFilters(filters)
//     apiPath += `?${chFilters}`
//   }

//   return axios
//     .get(apiPath)
//     .then((res: AxiosResponse) => {
//       return res.data as Character
//     })
//     .catch((err: AxiosError) => {
//       return err.code as string
//     })
// }

export function getEpisodesByIds(episodeIds: string): Promise<Episode[] | string> {
  return axios
    .get(`${basePath}/episode/${episodeIds}`)
    .then((res: AxiosResponse) => {
      return res.data as Episode[]
    })
    .catch((err: AxiosError) => {
      return err.code as string
    })
}

export function getLocationById(locationId: number): Promise<Location | string> {
  return axios
    .get(`${basePath}/location/${locationId}`)
    .then((res: AxiosResponse) => {
      return res.data as Location
    })
    .catch((err: AxiosError) => {
      return err.code as string
    })
}

export function getLocationByName(locationName: string): Promise<Location | string> {
  return axios
    .get(`${basePath}/location/?name=${locationName}`)
    .then((res: AxiosResponse) => {
      return res.data[0] as Location
    })
    .catch((err: AxiosError) => {
      return err.code as string
    })
}
