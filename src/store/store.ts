/* eslint-disable space-before-function-paren */
import { Character } from '@/interfaces'
import { PersistentStore } from './'

interface RootState extends Object {
  characterList: Array<Character>
  currentCharacter: Character | Record<string, unknown>
}

class RMStore extends PersistentStore<RootState> {
  protected data(): RootState {
    return {
      characterList: [],
      currentCharacter: {}
    }
  }

  setCurrentCharacterById(characterId: number) {
    const chMatch = this.state.characterList.find((c: Character) => c.id === characterId)
    Object.assign(this.state.currentCharacter, chMatch)
  }

  setCurrentCharacterData(character: Character) {
    Object.assign(this.state.currentCharacter, character)
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

  setCharactersList(characters: Character[]) {
    this.state.characterList = [...characters]
  }

  addCharacterToList(character: Character) {
    this.state.characterList.push(character)
  }
}

export const rmStore = new RMStore('RMStore')
