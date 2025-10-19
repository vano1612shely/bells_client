import { Gift, Ruler, Package, Star, Gem } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProductSpecs() {
  const specs = [
    { icon: Gift, label: 'Type', value: 'Décoration de sapin' },
    {
      icon: Package,
      label: 'Matériau',
      value: 'Acrylique, satin, flocons décoratifs',
    },
    { icon: Ruler, label: 'Taille', value: 'Diamètre 8–10 cm' },
    { icon: Star, label: 'Contenu', value: 'Boule + ruban + photo + décor' },
    {
      icon: Gem,
      label: 'Particularités',
      value: 'Cadeau exclusif pour vos proches',
    },
  ]

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-gradient-to-r from-green-50 to-white rounded-3xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Caractéristiques
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {specs.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                <item.icon size={22} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Badge en bas */}
        <div className="mt-10 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 w-full bg-gradient-to-r from-green-400 to-green-500
             hover:from-green-500 hover:to-green-600
             text-white text-xl font-extrabold py-4 rounded-full shadow-lg
             tracking-wide transition-all"
            onClick={() => {
              const el = document.getElementById('order')
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          >
            🎁 Idéal comme cadeau
          </motion.button>
        </div>
      </div>
    </section>
  )
}
