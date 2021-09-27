<template>
  <div id="home">
    <div class="container">
      <template v-if="isLoading">
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </template>
      <template v-else>
        <h1>Character list: </h1>
        <ul id="characters-list">
          <CharacterElement
            v-for="(ch, index) in charactersList"
            :key="index" :character-id="ch.id"
            @on-character-selected="toggleMoreDetails = `${$event}_${Date.now()}`"
          />
        </ul>
        <CharacterDetails :show="toggleMoreDetails" />
        <Paginator />
      </template>
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
