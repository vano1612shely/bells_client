export type RelayPointResponse = {
  center?: {
    lat: number
    lon: number
  }
  points: Array<{
    id: number
    name: string
    address: string
    cp: number
    city: string
    lat: number
    lon: number
    raw: {
      Num: number
      LgAdr1: string
      LgAdr2: string
      LgAdr3: string
      LgAdr4: string
      CP: string
      Ville: string
      Pays: string
    }
  }>
}
