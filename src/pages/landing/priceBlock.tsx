import { motion } from 'framer-motion'

import img1 from '/count_box.png' // boite
import img2 from '/count_arrow.png' // fleche
import { formatPrice } from '@/shared/lib/utils.ts'
import { usePrice } from '@/modules/price'
import { useDiscounts } from '@/modules/discounts'

export default function PriceBlock() {
  const { data } = usePrice()
  const {
    data: discounts,
    isLoading: isDiscountsLoading,
  } = useDiscounts()
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full mx-auto bg-gradient-to-br from-white via-yellow-50 to-pink-50
                 p-6 rounded-3xl shadow-xl border border-yellow-200 relative overflow-hidden"
    >
      {/* Eclat festif */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-40" />

      {/* Bloc superieur du prix */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-inner mb-6 overflow-hidden">
        <div className="px-5 py-3 text-gray-600 text-sm md:text-base">
          PRIX HABITUEL :{' '}
          <span className="line-through font-bold text-gray-500">
            {data?.price && formatPrice(8)}
          </span>
        </div>
        <div className="bg-red-500 text-white px-6 py-3 font-extrabold text-xl tracking-wide text-center w-full md:w-auto">
          PROMO : {data?.price && formatPrice(data.price)}
        </div>
      </div>

      <div className="bg-white/80 border border-yellow-200 rounded-2xl p-4 shadow-inner mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-red-600">Bulk discounts</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            applied automatically
          </span>
        </div>
        {isDiscountsLoading ? (
          <p className="text-sm text-gray-500">Loading current discounts...</p>
        ) : discounts?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {discounts.map((discount) => (
              <div
                key={discount.id}
                className="flex items-center justify-between bg-gradient-to-r from-red-50 to-yellow-50 border border-red-100 px-4 py-3 rounded-xl"
              >
                <div className="text-gray-700 font-semibold">
                  From {discount.count} pcs.
                </div>
                <div className="text-green-600 font-extrabold text-lg">
                  -{discount.discount}%
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No extra discounts right now.</p>
        )}
      </div>

      {/* Liste des conditions */}
      <div className="space-y-4 relative z-10">
        {[
          {
            text: (
              <>
                Attention ! Commande minimale :{' '}
                <span className="text-red-600 font-bold">2 pcs</span>
              </>
            ),
          },
          {
            text: (
              <>
                Stock restant :{' '}
                <span className="text-red-600 font-bold">50 pcs</span>
              </>
            ),
          },
          {
            text: (
              <>
                Delai de fabrication :{' '}
                <span className="text-red-600 font-bold">2-3 jours</span>
              </>
            ),
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white/70 p-3 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <img src={img1} alt="boite" className="w-6 h-6" />
              <span className="text-gray-700 text-sm md:text-base font-medium">
                {item.text}
              </span>
            </div>
            <img src={img2} alt="fleche" className="w-6 h-6 opacity-70" />
          </div>
        ))}
      </div>

      {/* Bouton */}
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
        COMMANDER AVEC REDUCTION
      </motion.button>
    </motion.div>
  )
}
