<template>
<div class="modal fade" :class="{ 'show d-block': showModal }" v-if="showModal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Who's {{ content.name }}?</h5>
          <button type="button" class="btn-close" @click="showModal = false"></button>
        </div>
        <div class="modal-body">
          <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="showModal = false">Close, thanks</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { Character } from '@/interfaces'
import { Vue, Options } from 'vue-class-component'
import { rmStore } from '@/store/store'

@Options({
  props: {
    show: String
  },
  watch: {
    show: {
      handler (status: boolean) {
        this.showModal = status !== null
        if (this.showModal) {
          this.modalContent = rmStore.getState().currentCharacter
        } else {
          this.modalContent = null
        }
      },
      immediate: true
    }
  }
})
export default class CharacterDetails extends Vue {
  showModal = Boolean(false)
  modalContent: Character | null = null

  get content (): Character {
    return this.modalContent as Character
  }
}
</script>
<style lang="scss">
</style>
