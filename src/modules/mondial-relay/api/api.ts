import type { RelayPointResponse } from '@/modules/mondial-relay/types'
import { apiClient } from '@/shared/api'
import { MONDIAL_RELAY_URLS } from '@/modules/mondial-relay/api/routes.ts'

export const MondialRelayApi = {
  baseKey: 'mondial-relay',
  getPoints: (q: string) =>
    apiClient.get<RelayPointResponse>({
      url: MONDIAL_RELAY_URLS.points,
      params: {
        q,
      },
    }),
}
