import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

const fetchListingDetails = async (listingId) => {
  const response = await api.get('/api/v2/getPropertyDetails', {
    params: {
      listingId,
      currency: 'USD',
    },
  })
  return response.data
}

export function useListingDetails(listingId) {
  return useQuery({
    queryKey: ['listing', listingId],
    queryFn: () => fetchListingDetails(listingId),
    enabled: !!listingId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })
}