import { Card, CardContent } from '@/shared/components/ui/card'
import { motion } from 'framer-motion'

const steps = [
  {
    title: 'Étape 1',
    text: 'Remplissez le formulaire sur notre site ou écrivez-nous sur Telegram ou Viber. Notre responsable confirmera les détails de votre commande.',
    img: '/delivery1.jpg',
  },
  {
    title: 'Étape 2',
    text: 'Nous transformons vos photos en magnifiques maquettes de boules, que nous vous envoyons pour validation. Une fois votre accord reçu, chaque boule est soigneusement préparée, prête à illuminer vos souvenirs et ceux de vos proches.',
    img: '/delivery2.jpg',
  },
  {
    title: 'Étape 3',
    text: 'Vous payez votre colis à la livraison – simple et sécurisé.',
    img: '/delivery3.jpg',
  },
]

export default function DeliverySection() {
  return (
    <section className="w-full py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-4 text-gray-800">
          Comment commander
        </h2>
        <p className="text-center text-gray-600 mb-12">Livraison et paiement</p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Card className="rounded-3xl shadow-lg bg-white/80 backdrop-blur-md overflow-hidden h-full flex flex-col items-center text-center hover:shadow-2xl transition">
                <div className="relative flex flex-col items-center">
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-green-200 to-green-600 p-[3px] shadow-lg">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full rounded-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 bg-gradient-to-r from-green-100 to-green-300 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold shadow">
                    {step.title}
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex items-center">
                  <p className="text-gray-700 leading-relaxed">{step.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
