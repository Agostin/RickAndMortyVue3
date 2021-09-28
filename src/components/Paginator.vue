<template>
<nav class="table-responsive mb-2 shadow">
  <ul class="pagination mb-3">
    <li class="page-item" v-if="currentPage > 1">
      <a class="page-link" @click="loadPage(0)"><span aria-hidden="true">Previous</span></a>
    </li>
    <template v-for="(p, index) in charactersListMetas.pages" :key="index">
      <li class="page-item" :class="{ 'active' : p === currentPage }">
        <a class="page-link" @click="loadPage(p)">{{ p }}</a>
      </li>
    </template>
    <li class="page-item" v-if="currentPage < charactersListMetas.pages">
      <a class="page-link" @click="loadPage(null)"><span aria-hidden="true">Next</span></a>
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

  mounted (): void {
    if (this.charactersListMetas.count === 1) {

    }
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
@import '../assets';
nav {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  .pagination {
    .page-item {
      cursor: pointer;
      &.active,
      &:hover {
        .page-link {
          color: white;
          background-color: $dark-gray;
          border-color: $dark-gray;
        }
      }
      .page-link {
        color: $dark-gray;
        background-color: white;
        border-color: white;
      }
    }
  }
}
</style>
