<template>
<nav>
  <ul class="pagination justify-content-end">
    <li class="page-item">
      <a class="page-link" @click="loadNextPage(1)" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" v-for="(item, index) in listItems" :key="index">
      <a class="page-link" @click="loadNextPage(index)">{{ index }}</a>
    </li>
    <li class="page-item">
      <a class="page-link" @click="loadNextPage(listItems.length)" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    items: Array
  }
})
export default class Paginator extends Vue {
  listItems: [] = []

  loadNextPage (page: number): void {
    alert('loading page: ' + page)
  }
}
</script>
<style lang="scss">
</style>
