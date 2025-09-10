export const runWithMultipleContexts = async <T>(
  contexts: Array<[InstanceType<typeof AsyncLocalStorage<any>>, any]>,
  mainFunc: () => Promise<T>,
  index: number = 0
): Promise<T> => {
  if (index >= contexts.length) {
    return mainFunc()
  }
  const [storage, store] = contexts[index]
  return storage.run(store, () => runWithMultipleContexts(contexts, mainFunc, index + 1))
}
