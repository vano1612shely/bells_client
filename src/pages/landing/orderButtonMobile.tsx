import { useEffect, useState } from 'react'
import { Gift } from 'lucide-react'
import { motion } from 'framer-motion'

const OrderButtonMobile = () => {
  const [isOrderVisible, setIsOrderVisible] = useState(false)

  useEffect(() => {
    const orderElement = document.getElementById('order')
    if (!orderElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOrderVisible(entry.isIntersecting)
      },
      {
        root: null, // viewport
        threshold: 0.1, // 10% блоку видимі
      },
    )

    observer.observe(orderElement)

    return () => observer.disconnect()
  }, [])

  if (isOrderVisible) return null

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        const el = document.getElementById('order')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }}
      className="z-100 fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] md:hidden md:w-auto flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition"
    >
      <Gift size={20} /> Commander
    </motion.button>
  )
}

export default OrderButtonMobile
