<template>
  <div v-if="character" class="character-row-element mb-2 shadow-sm p-2">
    <div class="d-flex text-start">
      <div class="flex-shrink-1 image">
        <img :src="character.image" width="125" class="img-thumbnail mx-auto d-block" :alt="`Image of character ${character.name}`">
      </div>
      <div class="ps-3 flex-grow-1 mb-2 main-info">
        <div class="d-block text-truncate">
          <div class="d-flex align-items-center">
            <span class="fw-bold fs-5">{{ character.name }}</span>
            <span class="text-muted ms-1" v-if="character.species">({{ character.species }})</span>
          </div>
          <div class="d-block" v-if="character.gender">
            Gender: <span class="badge bg-secondary me-2">{{ character.gender }}</span>
          </div>
          <div class="d-block" v-if="character.status">
            Status: <span class="badge bg-success" >{{ character.status }}</span>
          </div>
        </div>
        <div class="d-flex justify-content-start align-items-center">
          <p>
            <button
              class="btn btn-primary" type="button" data-bs-toggle="collapse" :data-bs-target='`.multi-collapse-${character.id}`' aria-expanded="false" :aria-controls="`locationCollapse${character.id} episodesCollapse${character.id}`"
              @click.once="fetchCharacterInfo">Toggle both elements</button>
          </p>
          <div class="d-flex justify-content-center">
            <div class="spinner-grow text-success" role="status" v-show="detailsFetchingLoader">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div class="row" v-if="!detailsFetchingLoader">
            <div class="col">
              <div :class="`collapse show multi-collapse-${character.id}`" :id="`locationCollapse${character.id}`">
                <div class="card card-body location-info" v-if="locationDetails">
                  <strong>Location:</strong>
                  {{ locationDetails?.name }}
                </div>
              </div>
            </div>
            <div class="col">
              <div :class="`collapse show multi-collapse-${character.id}`" :id="`episodesCollapse${character.id}`">
                <div class="card card-body episodes-info" v-if="episodeDetails">
                  <strong>Episodes:</strong>
                  {{ episodeDetails?.length }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Character, Episode, Location } from '@/interfaces'
import { getEpisodesByIds, getLocationById, getLocationByName } from '@/services/api'
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    info: Object
  },
  watch: {
    info: {
      async handler (obj: Character) {
        this.character = Object.assign({}, this.character, obj)
      },
      immediate: true
    }
  }
})
export default class CharacterElement extends Vue {
  detailsFetchingLoader = Boolean(false)
  character: Character | null = null
  _serializedEpisodeIds!: string
  episodeDetails: Episode[] | null = null
  locationDetails: Location | null = null

  _serializeEpisodesIds (): string {
    return this.character?.episode
      .flatMap((episodeUrl: string) => episodeUrl.split('/').slice(-1))
      .join(',') as string
  }

  async fetchCharacterInfo (): Promise<void> {
    this.detailsFetchingLoader = true
    await this.fetchLocationInfoFromName(this.character?.location?.name as string)
    await this.fetchEpisodesInfo(this._serializeEpisodesIds())
    this.detailsFetchingLoader = false
  }

  async fetchEpisodesInfo (episodeIds: string): Promise<void> {
    this.episodeDetails = await getEpisodesByIds(episodeIds) as Episode[]
    console.log(this.episodeDetails)
  }

  async fetchLocationInfoFromName (locationName: string): Promise<void> {
    this.locationDetails = await getLocationByName(locationName) as Location
    console.log(this.locationDetails)
  }
}
</script>

<style scoped lang="scss">
.character-row-element {
  .image {}
  .info {}
}
</style>
