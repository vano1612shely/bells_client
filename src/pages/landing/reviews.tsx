import React, { useEffect } from 'react'
import { Quote } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'

type Review = {
  name: string
  city: string
  userPhoto: string
  productPhoto: string
  text: string
}

const reviews: Array<Review> = [
  {
    name: 'Marie',
    city: 'Paris',
    userPhoto: '/user1.jpg',
    productPhoto: '/review1.jpg',
    text: 'Bonsoir ! J’ai bien reçu les boules, elles sont magnifiques ! J’ai hâte de les offrir 😊',
  },
  {
    name: 'Sophie',
    city: 'Lyon',
    userPhoto: '/user2.jpg',
    productPhoto: '/review2.jpg',
    text: 'J’ai commandé trois boules comme cadeaux – elles ont beaucoup plu à mes amis ! Puis j’en ai repris 25 pour toute la famille. Une beauté incroyable ! Merci pour ce cadeau aussi original et merveilleux !',
  },
  {
    name: 'Antoine',
    city: 'Marseille',
    userPhoto: '/user3.jpg',
    productPhoto: '/review3.jpg',
    text: 'Merci beaucoup ! J’ai commandé une boule personnalisée pour ma fille, elle est superbe et de très belle qualité.',
  },
]

export default function ReviewsSlider() {
  const [index, setIndex] = React.useState(0)
  const [hovered, setHovered] = React.useState(false)

  const nextSlide = React.useCallback(() => {
    setIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1))
  }, [])

  // défilement automatique
  useEffect(() => {
    if (hovered) return
    const timer = setInterval(() => {
      nextSlide()
    }, 3000)
    return () => clearInterval(timer)
  }, [hovered, nextSlide])

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-20 relative">
      <h2 className="text-center text-3xl font-bold mb-12 text-gray-800">
        Avis de nos clients
      </h2>

      <div
        className="relative max-w-xl mx-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="rounded-3xl shadow-2xl bg-white/70 backdrop-blur-md relative overflow-hidden">
              <CardHeader className="flex w-full items-center justify-center m-0">
                <img
                  src={reviews[index].userPhoto}
                  alt={reviews[index].name}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                />
              </CardHeader>
              <CardContent className="px-8 flex flex-col gap-5 text-center">
                <Quote className="mx-auto w-10 h-10 mt-4 text-green-300" />

                {/* Texte de l’avis */}
                <p className="text-gray-700 italic leading-relaxed">
                  “{reviews[index].text}”
                </p>

                {/* Photo du produit */}
                <img
                  src={reviews[index].productPhoto}
                  alt="produit"
                  className="w-full h-72 object-cover rounded-xl shadow-md"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {reviews[index].name}
                  </p>
                  <p className="text-sm text-gray-500">{reviews[index].city}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* miniatures de navigation */}
      <div className="flex justify-center mt-8 gap-3">
        {reviews.map((r, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-10 h-10 rounded-full overflow-hidden border-2 transition ${
              i === index ? 'border-gray-800' : 'border-transparent opacity-50'
            }`}
          >
            <img
              src={r.userPhoto}
              alt={r.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  )
}
