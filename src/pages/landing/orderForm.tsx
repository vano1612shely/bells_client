import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Phone, User } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export default function OrderForm() {
  const [form, setForm] = useState({ name: '', phone: '' })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate({
      to: '/order',
      search: {
        phone: form.phone,
        name: form.name,
      },
    })
  }

  return (
    <section
      className="relative w-full py-16 bg-gradient-to-br from-green-50 via-white to-yellow-50"
      id="order"
    >
      {/* Décor lumineux */}
      <div className="absolute -top-16 left-10 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-10 w-52 h-52 bg-green-200 rounded-full blur-3xl opacity-30" />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-12 border border-white/40"
        >
          <h2 className="text-center text-3xl font-extrabold text-green-700 mb-4">
            Commandez maintenant
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 md:flex-row md:items-center"
          >
            {/* Nom */}
            <div className="flex-1 relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Votre prénom"
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none shadow-sm text-lg"
              />
            </div>

            {/* Téléphone */}
            <div className="flex-1 relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Votre téléphone"
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 outline-none shadow-sm text-lg"
              />
            </div>

            {/* Bouton */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition"
            >
              <Gift size={20} /> Commander
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
