<template>
  <div v-if="character" class="character-row-element">
    <p>{{ character.id }}</p>
    <p>{{ character.name }}</p>
    <p>{{ character.species }}</p>
  </div>
</template>

<script lang="ts">
import { RMCharacter } from '@/interfaces'
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    info: Object
  },
  watch: {
    info: {
      handler (obj: RMCharacter) {
        this.character = Object.assign({}, this.character, obj)
      },
      immediate: true
    }
  }
})
export default class CharacterElement extends Vue {
  character: RMCharacter | null = null
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
