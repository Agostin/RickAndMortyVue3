<template>
  <div class="character-block col-xs-12 col-sm-6 col-lg-4 p-2"
    @click="onSelectCharacter">
    <div class="d-flex text-start boder rounded shadow-sm" v-if="character">
      <div class="flex-shrink-1 image">
        <img :src="character.image" width="120" class="rounded-start" :alt="`Image of character ${character.name}`">
      </div>
      <div class="ps-3 flex-grow-1 mb-2">
        <div class="lh-1 my-2">
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
.character-block {
  transition: all .5s;
  > .d-flex {
    cursor: pointer;
    &:hover {
      box-shadow: 0 2px 15px lightgrey !important
    }
  }
}
</style>
