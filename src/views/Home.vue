<template>
  <div id="home">
    <template v-if="isLoading">
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </template>
    <template v-else>
      <ul id="characters-list">
        <CharacterElement
          v-for="(ch, index) in charactersList"
          :key="index"
          :info="ch"
        />
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { reactive } from 'vue'
import { getCharacters } from '@/services/api'
import { RMCharacter } from '@/interfaces'

import CharacterElement from '@/components/CharacterElement.vue'

@Options({
  components: {
    CharacterElement
  }
})
export default class Home extends Vue {
  isLoading = Boolean(true)
  charactersList = reactive<RMCharacter[]>([])

  async mounted (): Promise<void> {
    const response = await getCharacters()
    if (typeof response !== 'string') {
      this.charactersList = response.results
    }
    this.isLoading = false
  }
}
</script>
