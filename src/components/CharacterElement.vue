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
            @click="onSelectCharacter">More details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { Character } from '@/interfaces'
import { rmStore } from '@/store/store'

@Options({
  props: {
    characterId: Number
  },
  emits: ['onCharacterSelected'],
  watch: {
    characterId: {
      handler (chId: number) {
        this.character = rmStore.getState().characterList.find((ch: Character) => ch.id === chId)
      },
      immediate: true
    }
  }
})
export default class CharacterElement extends Vue {
  character: Character | null = null

  get characterId (): number {
    return this.character?.id as number
  }

  onSelectCharacter (): void {
    rmStore.setCurrentCharacterFromId(this.characterId)
    this.$emit('onCharacterSelected', this.characterId)
  }
}
</script>

<style scoped lang="scss">
.character-row-element {
  .image {}
  .info {}
}
</style>
