<template>
  <div id="home" class="h-100">
    <div class="container h-100">
      <template v-if="isLoading">
        <div class="d-flex h-100 justify-content-center align-items-center">
          <div class="spinner-grow text-success" style="width: 5rem; height: 5rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </template>
      <div class="row" v-else>
        <div class="col text-start py-4">
          <h2>Rick and Morty'a characters list: </h2>
          <div class="d-block my-2">
            <input type="text" class="form-control" placeholder="Filter by name" v-model="nameFilter">
          </div>
          <ul class="p-0" id="characters-list">
            <CharacterElement
              v-for="(ch, index) in filteredList"
              :key="index" :character-id="ch.id"
              @on-character-selected="toggleMoreDetails = `${$event}_${Date.now()}`"
            />
          </ul>
          <CharacterDetails :show="toggleMoreDetails" />
          <Paginator />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { reactive } from 'vue'
import { getCharacters } from '@/services/api'
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
  isLoading = Boolean(true)
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

  async mounted (): Promise<void> {
    const response = await getCharacters()
    if (typeof response !== 'string') {
      this.charactersList = response.results as Character[]
      rmStore.setCharactersList(this.charactersList)
    }
    this.isLoading = false
  }
}
</script>
