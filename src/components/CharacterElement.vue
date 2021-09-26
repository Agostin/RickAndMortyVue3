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
          <!-- PUT IN A MODAL!! -->
          <div class="row" v-if="!detailsFetchingLoader">
            <div class="col">
              <div :class="`collapse multi-collapse-${character.id}`" :id="`locationCollapse${character.id}`">
                <div class="card card-body location-info" v-if="characterLocation">
                  <strong>Location:</strong>
                  {{ characterLocation.name }}
                </div>
              </div>
            </div>
            <div class="col">
              <div :class="`collapse multi-collapse-${character.id}`" :id="`episodesCollapse${character.id}`">
                <div class="card card-body episodes-info" v-if="characterEpisodes.length">
                  <strong>Episodes:</strong>
                  {{ characterEpisodes.length }}
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
import { getEpisodesByIds, getLocationByName } from '@/services/api'
import { Options, Vue } from 'vue-class-component'
import { rmStore } from '@/store/store'

@Options({
  props: {
    info: Object
  },
  watch: {
    info: {
      // HANDLE ID CHANGE
      async handler (obj: Character) {
        this.character = Object.assign({}, this.character, obj)
        rmStore.setCurrentCharacterData(this.character)
      },
      immediate: true,
      deep: true
    }
  }
})
export default class CharacterElement extends Vue {
  detailsFetchingLoader = Boolean(false)
  character: Character | null = null
  _serializedEpisodeIds!: string
  episodeDetails: Episode[] | null = null
  locationDetails: Location | null = null

  get characterEpisodes (): Episode[] {
    return rmStore.getState().currentCharacter.episode as Episode[]
  }

  get characterLocation (): Location {
    return rmStore.getState().currentCharacter.location as Location
  }

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
    rmStore.fillupCharacterEpisodes(this.character?.id as number, this.episodeDetails)
    console.log(rmStore.getState().currentCharacter)
  }

  async fetchLocationInfoFromName (locationName: string): Promise<void> {
    this.locationDetails = await getLocationByName(locationName) as Location
    rmStore.fillupCharacterLocation(this.character?.id as number, this.locationDetails)
    console.log(rmStore.getState().currentCharacter)
  }
}
</script>

<style scoped lang="scss">
.character-row-element {
  .image {}
  .info {}
}
</style>
