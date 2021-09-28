<template>
  <div id="home" class="h-100">
    <div class="container-fluid h-100">
      <template v-if="isLoading">
        <div class="d-flex h-100 justify-content-center align-items-center">
          <div class="spinner-grow text-secondary" style="width: 5rem; height: 5rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </template>
      <div class="row h-100" v-else>
        <div class="title-wrapper d-block text-center py-4">
          <h1 class="text-hero m-0">Rick and Morty's characters list:</h1>
        </div>
        <div class="list-wrapper col text-start">
          <div class="d-block mt-5 mx-2 mb-3">
            <div class="row m-0">
              <div class="input-group col p-0">
                <span class="input-group-text">🔍</span>
                <input type="text" class="form-control" placeholder="Filter characters by name..." v-model="nameFilter">
              </div>
              <template v-if="filteredList.length === 0">
                <button class="btn btn-success col" type="button" style="max-width: 10rem"
                  @click="searchCharacterFromApi">Search More</button>
              </template>
            </div>
          </div>
          <template v-if="filteredList.length">
            <ul class="p-0 m-0 row" id="characters-list">
              <CharacterElement
                v-for="(ch, index) in filteredList"
                :key="index" :character-id="ch.id"
                @on-character-selected="toggleMoreDetails = `${$event}_${Date.now()}`"
              />
            </ul>
            <CharacterDetails :show="toggleMoreDetails" />
            <Paginator class="my-5" @on-page-selected="loadNewCharacterPage($event)" />
          </template>
          <template v-else>
            <div class="alert alert-light my-4 mx-2" role="alert">
              <h4 class="alert-heading">Oops!</h4>
              <p class="fs-5">We didn't find a match! If you're sure that you typed right, please click on the "Search More" button to make a deeper search</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { reactive } from 'vue'
import { getCharacters, getCharactersFromName } from '@/services/api'
import { Character } from '@/interfaces'
import { rmStore } from '@/store/store'

import CharacterElement from '@/components/CharacterElement.vue'
import CharacterDetails from '@/components/CharacterDetails.vue'
import Paginator from '@/components/Paginator.vue'

@Options({
  components: {
    CharacterElement,
    CharacterDetails,
    Paginator
  }
})
export default class Home extends Vue {
  isLoading = Boolean(false)
  toggleMoreDetails: string | null = null
  charactersList = reactive<Character[]>([])
  nameFilter?: string = ''

  get filteredList (): Character[] | [] {
    if ((this.nameFilter as string).length > 2) {
      return this.charactersList.filter((ch: Character) =>
        ch.name.toLowerCase().indexOf((this.nameFilter as string).toLowerCase()) !== -1)
    } else {
      return this.charactersList
    }
  }

  mounted (): void {
    this.loadCharacters()
  }

  async loadCharacters (page = 1): Promise<void> {
    this.isLoading = true
    const response = await getCharacters(page)
    if (response && typeof response !== 'string') {
      this.charactersList = response.results as Character[]
      rmStore.setCharactersList(this.charactersList)
      rmStore.setCharactersListInfo(response.info)
    }
    this.isLoading = false
  }

  async searchCharacterFromApi (): Promise<void> {
    this.isLoading = true
    const response = await getCharactersFromName(this.nameFilter as string)
    if (response && typeof response !== 'string') {
      this.charactersList = response.results as Character[]
      rmStore.setCharactersList(this.charactersList)
      rmStore.setCharactersListInfo(response.info)
    }
    this.isLoading = false
  }

  loadNewCharacterPage (page: number): void {
    rmStore.setCurrentPage(page)
    this.toggleMoreDetails = null
    this.nameFilter = ''
    this.loadCharacters(page)
  }
}
</script>

<style scoped lang="scss">
@import '../assets';

#home {
  .text-hero {
    font-size: 3.75rem;
    font-weight: bold;
  }
  .list-wrapper {
    background: $black;
  }
}
</style>
