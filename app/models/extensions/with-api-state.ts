import { observable } from 'mobx';
import { IStateTreeNode } from "mobx-state-tree"

export const withApiState = (self: IStateTreeNode) => {
  const loading = observable.box(false)
  // ref: https://mobx-state-tree.js.org/concepts/volatiles
  return {
      views: {
          get isLoading() {              
              return loading.get()
          }
      },
      actions: {
        _setLoading (status: boolean) {
          loading.set(status)
      }
    }
  }
}