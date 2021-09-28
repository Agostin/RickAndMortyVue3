<template>
  <div class="character-block-wrapper col-xs-12 col-md-6 p-2" @click="onSelectCharacter">
    <div class="character-block d-flex text-start rounded-3 shadow-sm text-break" v-if="character">
      <div class="flex-shrink-1 image">
        <img :src="character.image" width="220" class="rounded-start" :alt="`Image of character ${character.name}`">
      </div>
      <div class="ps-3 flex-grow-1 mb-2 position-relative">
        <div class="lh-1 mt-2 mb-1">
          <p class="fw-bold fs-2 mt-4 mb-1">{{ character.name }}</p>
          <div class="d-block mb-3">
            <span :class="`me-1 bullet d-inline-block status-${character.status.toLowerCase()}`"></span>
            <span class="text-muted ms-1">
              {{ character.status }} - {{ character.species }}
            </span>
          </div>
          <div class="d-block position-absolute bottom-0">
            <label class="fw-bold mb-1 text-muted">Last known location:</label>
            <p class="fs-5">{{ character.location.name }}</p>
          </div>
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
@import '../assets';
.character-block-wrapper {
  transition: all .5s;
  .character-block {
    background: $dark-gray;
    color: white;
    cursor: pointer;
    &:hover {
      box-shadow: 0 .2rem 1.5rem darken($black, 15%) !important
    }
    .bullet {
      border-radius: 25rem;
      width: .5rem;
      height: .5rem;
      &.status-unknown {
        background: gray;
      }
      &.status-alive {

        background: green;
      }
      &.status-dead {
        background: red;
      }
    }
  }
}
</style>
