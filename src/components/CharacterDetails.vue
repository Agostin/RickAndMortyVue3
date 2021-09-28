<template>
<div class="modal fade" :class="{ 'show d-block': showModal }" v-if="showModal">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content" v-if="character">
      <div class="modal-header">
        <h5 class="modal-title">Who's {{ character.name }}?</h5>
        <button type="button" class="btn-close" @click="showModal = false"></button>
      </div>
      <div class="modal-body">
        <div class="row g-0">
          <div class="col-md-3">
            <img :src="character.image" class="img-fluid rounded-start">
          </div>
          <div class="col-md-9 ps-3 text-start">
            <strong class="fs-5">{{ character.name }}</strong>
            <p class="mb-0" v-if="character.species">
              Species: <span class="badge bg-primary me-2">{{ character.species }}</span>
            </p>
            <p class="mb-0" v-if="character.gender">
              Gender: <span class="badge bg-secondary me-2">{{ character.gender }}</span>
            </p>
            <p class="mb-0" v-if="character.status">
              Status: <span class="badge bg-success me-2">{{ character.status }}</span>
            </p>
            <template v-if="characterEpisodes.length">
              <strong class="d-block mt-2">Location: </strong>
              <table class="table table-success my-1" v-if="characterLocation?.name">
                <tbody>
                  <tr>
                    <td>{{ characterLocation.name }}</td>
                    <td>{{ characterLocation.residents?.length }}</td>
                    <td>{{ characterLocation.dimension }}</td>
                  </tr>
                </tbody>
              </table>
            </template>
          </div>
          <div class="col-md-12 mt-1 text-start" v-if="characterEpisodes.length">
            <strong class="d-block mt-2">Episodes: </strong>
            <table class="table table-secondary table-striped my-1">
              <tbody>
                <tr v-for="ep in characterEpisodes" :key="ep.id">
                  <th scope="row">{{ ep.episode }}</th>
                  <td>{{ ep.name }}</td>
                  <td>{{ ep.air_date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="showModal = false">Got it!</button>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Character, Episode, Location } from '@/interfaces'
import { getEpisodesByIds, getLocationByName } from '@/services/api'
import { rmStore } from '@/store/store'

@Options({
  props: {
    show: String
  },
  watch: {
    show: {
      async handler (status: number | null) {
        this.showModal = status !== null
        if (this.showModal) {
          this.character = rmStore.getState().currentCharacter
          // fetch episodes detiled infos
          await this.fetchEpisodesInfo(this._serializeEpisodesIds())
          // fetch location detiled infos
          await this.fetchLocationInfoFromName(this.character?.location?.name)
        } else {
          this.character = null
        }
      },
      immediate: true
    }
  }
})
export default class CharacterDetails extends Vue {
  showModal = Boolean(false)
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
    return (this.character?.episode as string[])
      .flatMap((episodeUrl: string) => episodeUrl.split('/').slice(-1))
      .join(',') as string
  }

  async fetchEpisodesInfo (episodeIds: string): Promise<void> {
    this.episodeDetails = await getEpisodesByIds(episodeIds) as Episode[]
    rmStore.fillupCharacterEpisodes(this.character?.id as number, this.episodeDetails)
  }

  async fetchLocationInfoFromName (locationName: string): Promise<void> {
    const locationMatches = await getLocationByName(locationName) as Location[]
    // I know, it's a bit forced result...
    this.locationDetails = locationMatches[0]
    rmStore.fillupCharacterLocation(this.character?.id as number, this.locationDetails)
  }
}
</script>
<style lang="scss">
</style>
