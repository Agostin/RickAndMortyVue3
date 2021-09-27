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

export function getEpisodesByIds(episodeIds: string): Promise<Episode[] | string> {
  const isMoreThanOneEpisode = episodeIds.split(',').length > 1
  return axios
    .get(`${basePath}/episode/${episodeIds}`)
    .then((res: AxiosResponse) => {
      return (isMoreThanOneEpisode ? res.data : [res.data]) as Episode[]
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

export function getLocationByName(locationName: string): Promise<Location[] | string> {
  return axios
    .get(`${basePath}/location/?name=${locationName}`)
    .then((res: AxiosResponse) => {
      return (res.data as RMApiResponse).results as Location[]
    })
    .catch((err: AxiosError) => {
      return err.code as string
    })
}
