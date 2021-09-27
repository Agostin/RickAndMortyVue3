/* eslint-disable space-before-function-paren */
import { Character, ApiPaginationInfo } from '@/interfaces'
import { PersistentStore } from './'

interface RootState extends Object {
  charactersListInfo: ApiPaginationInfo
  currentPage: number
  characterList: Array<Character>
  currentCharacter: Character | Record<string, unknown>
}

class RMStore extends PersistentStore<RootState> {
  protected data(): RootState {
    return {
      charactersListInfo: {
        count: 0,
        pages: 0,
        next: null,
        prev: null
      },
      currentPage: 1,
      characterList: [],
      currentCharacter: {}
    }
  }

  setCurrentCharacterFromId(characterId: number) {
    const chMatch = this.state.characterList.find((c: Character) => c.id === characterId)
    Object.assign(this.state.currentCharacter, chMatch)
  }

  fillupCharacterEpisodes(characterId: number, args: any) {
    if (!args) return false

    const chIndex = this.state.characterList.findIndex((c: Character) => c.id === characterId)
    if (this.state.characterList[chIndex]) {
      Object.assign(this.state.characterList[chIndex].episode, args)
    }
  }

  fillupCharacterLocation(characterId: number, args: any) {
    if (!args) return false

    const chIndex = this.state.characterList.findIndex((c: Character) => c.id === characterId)
    if (this.state.characterList[chIndex]) {
      Object.assign(this.state.characterList[chIndex].location, args)
    }
  }

  setCurrentPage(page: number) {
    this.state.currentPage = page
  }

  setCharactersListInfo(info: ApiPaginationInfo) {
    this.state.charactersListInfo = info
  }

  setCharactersList(characters: Character[]) {
    this.state.characterList = [...characters]
  }

  addCharacterToList(character: Character) {
    this.state.characterList.push(character)
  }
}

export const rmStore = new RMStore('RMStore')
