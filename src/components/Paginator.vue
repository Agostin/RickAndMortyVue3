<template>
<nav>
  <ul class="pagination justify-content-center">
    <li class="page-item" v-if="currentPage > 1">
      <a class="page-link" @click="loadPage(0)"><span aria-hidden="true">Previous</span></a>
    </li>
    <template v-for="index in 3" :key="index">
      <li v-if="index < 3 && currentPage < charactersListMetas.pages" class="page-item" :class="{ 'active': currentPage === index + currentPage - 1 }">
        <a class="page-link" @click="loadPage(index + currentPage - 1)">{{ index + currentPage - 1 }}</a>
      </li>
      <li v-else class="page-item"><a class="page-link">...</a></li>
    </template>
    <template v-if="currentPage <= charactersListMetas.pages">
      <li class="page-item">
        <a class="page-link" @click="loadPage(charactersListMetas.pages)">{{ charactersListMetas.pages }}</a>
      </li>
      <li class="page-item" v-if="currentPage < charactersListMetas.pages">
        <a class="page-link" @click="loadPage(null)"><span aria-hidden="true">Next</span></a>
      </li>
    </template>
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

  loadPage (pageToLoad: number | null): void {
    let newPage = pageToLoad
    if (pageToLoad === 0) {
      newPage = --rmStore.getState().currentPage
    } else if (pageToLoad === null) {
      newPage = ++rmStore.getState().currentPage
    }
    this.$emit('onPageSelected', newPage)
  }
}
</script>
<style lang="scss" scoped>
.pagination {
  .page-item {
    cursor: pointer
  }
}
</style>
