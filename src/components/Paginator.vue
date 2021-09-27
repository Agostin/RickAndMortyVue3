<template>
<nav>
  <ul class="pagination justify-content-center">
    <li class="page-item">
      <a class="page-link" @click="loadPage(0)" aria-label="Previous">
        <span aria-hidden="true">Previous</span>
      </a>
    </li>
    <li class="page-item" :class="{ 'active': item === currentPage }" v-for="item in charactersListMetas.pages" :key="item">
      <template v-if="item < 3 || item > charactersListMetas.pages - 2">
        <a class="page-link" @click="loadPage(item)">{{ item }}</a>
      </template>
      <template v-else-if="item === 3">
        <a class="page-link" href="#">...</a>
      </template>
    </li>
    <li class="page-item">
      <a class="page-link" @click="loadPage(charactersListMetas.count)" aria-label="Next">
        <span aria-hidden="true">Next</span>
      </a>
    </li>
  </ul>
</nav>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { rmStore } from '@/store/store'
import { ApiPaginationInfo } from '@/interfaces'

@Options({
  emits: ['onPageSelected']
})
export default class Paginator extends Vue {
  get charactersListMetas (): ApiPaginationInfo {
    return rmStore.getState().charactersListInfo
  }

  get currentPage (): number {
    return rmStore.getState().currentPage
  }

  loadPage (pageToLoad: number): void {
    let newPage = pageToLoad
    if (pageToLoad === 0) {
      newPage = --rmStore.getState().currentPage
    } else if (pageToLoad === this.charactersListMetas.count) {
      newPage = ++rmStore.getState().currentPage
    }
    this.$emit('onPageSelected', newPage)
  }
}
</script>
<style lang="scss">
</style>
