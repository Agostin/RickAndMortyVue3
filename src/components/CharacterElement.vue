<template>
  <div class="character-row-element mb-2 shadow-sm p-2">
    <div class="d-flex text-start" v-if="character">
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
          <button class="btn btn-link px-0" type="button"
            @click="fetchCharacterInfo(characterId)">More details</button>
        </div>
      </div>
    </div>
  </div>
  <CharacterDetails :show="toggleMoreDetails" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Character, Episode, Location } from '@/interfaces'
import { getEpisodesByIds, getLocationByName } from '@/services/api'
import { rmStore } from '@/store/store'
import CharacterDetails from '@/components/CharacterDetails.vue'

@Options({
  components: {
    CharacterDetails
  },
  props: {
    characterId: Number
  },
  watch: {
    characterId: {
      async handler (chId: number) {
        this.character = rmStore.getState().characterList.find((c: Character) => c.id === chId)
      },
      immediate: true
    }
  }
})
export default class CharacterElement extends Vue {
  toggleMoreDetails: string | null = null
  character: Character | null = null
  _serializedEpisodeIds!: string
  episodeDetails: Episode[] | null = null
  locationDetails: Location | null = null

  get characterId (): number {
    return this.character?.id as number
  }

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

  async fetchCharacterInfo (chId: number): Promise<void> {
    rmStore.setCurrentCharacterById(chId)
    // ADD DATA IN STORE
    // await this.fetchLocationInfoFromName(this.character?.location?.name as string)
    // await this.fetchEpisodesInfo(this._serializeEpisodesIds())
    // THEN SHOW MODAL
    this.toggleMoreDetails = Date.now() + ''
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
