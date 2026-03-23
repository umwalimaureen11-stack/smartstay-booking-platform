import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

const fetchListings = async (placeId) => {
  try {
    const response = await api.get('/api/v2/searchPropertyByPlaceId', {
      params: {
        placeId: placeId || 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ',
        currency: 'USD',
      },
    })
    return response.data
  } catch (error) {
    if (error.response?.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later.')
    }
    throw error
  }
}

export function useListings(placeId) {
  return useQuery({
    queryKey: ['listings', placeId],
    queryFn: () => fetchListings(placeId),
    staleTime: 1000 * 60 * 10,
    retry: false,
  })
}