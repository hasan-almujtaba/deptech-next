import { useQueryClient } from '@tanstack/react-query'

/**
 * Custom hook to perform actions on queries using React Query.
 * @param {string[]} queryKeys - An array of query keys.
 * @returns {Object} - An object containing functions to perform query actions.
 */
export const useQueryActions = (queryKey: string[]) => {
  const queryClient = useQueryClient()

  /**
   * Invalidates the specified queries, causing them to be refetched on the next render.
   */
  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey })
  }

  /**
   * Resets the specified queries, removing them from the query cache and forcing a refetch.
   */
  const resetQueries = () => {
    queryClient.resetQueries({ queryKey })
  }

  /**
   * Removes the specified queries from the query cache, preventing further fetching and rendering.
   */
  const removeQueries = () => {
    queryClient.removeQueries({ queryKey })
  }

  return {
    invalidateQueries,
    resetQueries,
    removeQueries,
  }
}
