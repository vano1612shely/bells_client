import { motion } from 'framer-motion'
import PriceBlock from './priceBlock'

export default function HeaderSection() {
  return (
    <header className="relative w-full pb-5 overflow-hidden">
      {/* cercles festifs lumineux */}
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-pink-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-yellow-200 rounded-full blur-3xl opacity-30" />

      {/* bannière supérieure */}
      <div className="w-full bg-yellow-300 p-3 font-extrabold text-red-700 text-center text-2xl rounded-b-2xl shadow-md">
        🎄 Boule de Noël Personnalisée 🎁
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mt-8 px-4 items-center">
        {/* photo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="p-4"
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
            <video
              src="/vid1.mp4"
              autoPlay
              playsInline
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* partie droite */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 justify-center"
        >
          {/* puces */}
          <ul className="flex flex-col gap-4">
            {[
              { img: '/ofr_bull1.png', text: 'Excellente qualité' },
              { img: '/ofr_bull2.png', text: 'Décoration originale' },
              { img: '/ofr_bull3.png', text: 'Beaucoup d’émotions' },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 bg-white/70 px-4 py-3 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <img src={item.img} alt="" className="w-8 h-8" />
                <span className="text-lg font-semibold text-gray-800">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          {/* bloc de prix */}
          <PriceBlock />
        </motion.div>
      </div>
    </header>
  )
}
