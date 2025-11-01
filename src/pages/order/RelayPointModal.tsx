import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { DeliveryMap } from './DeliveryMap'
import type { RelayPoint } from '@/modules/orders'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { usePoints } from '@/modules/mondial-relay'

/** Хук для debounce (затримка виклику) */
function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debounced
}

interface RelayPointModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (point: RelayPoint) => void
}

export const RelayPointModal = ({
  open,
  onOpenChange,
  onSelect,
}: RelayPointModalProps) => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  const [points, setPoints] = useState<Array<RelayPoint>>([])
  const [selected, setSelected] = useState<RelayPoint | null>(null)

  const { data, isLoading } = usePoints(debouncedQuery, {
    enabled: debouncedQuery.length >= 3,
  })

  useEffect(() => {
    if (!data) return
    const rawPoints = Array.isArray(data.points) ? data.points : []

    // фільтруємо порожні та некоректні точки
    const validPoints = rawPoints
      .filter((p) => p.lat && p.lon && p.raw.Num && p.raw.LgAdr1 && p.raw.Ville)
      .map((p) => ({
        id: p.id,
        Num: String(p.raw.Num),
        LgAdr1: p.raw.LgAdr1,
        LgAdr2: p.raw.LgAdr2 || '',
        LgAdr3: p.raw.LgAdr3 || '',
        LgAdr4: p.raw.LgAdr4 || '',
        CP: String(p.raw.CP),
        Ville: p.raw.Ville,
        Pays: p.raw.Pays,
        lat: p.lat,
        lon: p.lon,
        name: p.name,
        address: p.address,
        cp: p.cp,
        city: p.city,
      }))

    setPoints(validPoints)
    setSelected(validPoints[0] || null)
  }, [data])

  const handleSelect = () => {
    if (selected) onSelect(selected)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[80%] max-w-[1000px]">
        <DialogHeader>
          <h3 className="text-lg font-semibold">Choisir un point relais</h3>
        </DialogHeader>

        <div className="space-y-6">
          <Input
            placeholder="Code postal ou adresse"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Liste des points */}
            <div className="space-y-4 border rounded-md p-3">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                  <Loader2 className="animate-spin w-8 h-8 mb-2" />
                  <p>Recherche des points relais...</p>
                </div>
              ) : (
                <div className="max-h-[400px] overflow-auto space-y-2">
                  {points.length === 0 && debouncedQuery.length >= 3 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Aucun point relais trouvé.
                    </p>
                  )}

                  {points.map((p) => (
                    <div
                      key={p.Num}
                      onClick={() => setSelected(p)}
                      className={`p-3 border rounded-md transition cursor-pointer ${
                        selected?.Num === p.Num
                          ? 'bg-blue-100 border-blue-500'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <p className="font-medium">{p.LgAdr1}</p>
                      <p className="text-sm text-muted-foreground">
                        {p.CP} {p.Ville}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Carte */}
            <div className="h-[450px] border rounded-md overflow-hidden">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                  <Loader2 className="animate-spin w-8 h-8 mb-2" />
                  <p>Chargement de la carte...</p>
                </div>
              ) : (
                <DeliveryMap
                  points={points}
                  selected={selected}
                  onSelect={setSelected}
                />
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-end mt-4">
          <Button onClick={handleSelect} disabled={!selected || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Chargement...
              </>
            ) : (
              'Confirmer la sélection'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
