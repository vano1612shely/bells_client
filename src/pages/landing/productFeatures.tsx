import { motion } from 'framer-motion'

const features = [
  {
    id: 1,
    title: 'Cadeau original',
    highlight: 'Boule avec vos photos',
    description:
      'La meilleure idée de cadeau de Noël ! Désormais, votre photo ne sera pas seulement sur le téléphone ou l’ordinateur, mais aussi sur le sapin. Chaque année, vous pourrez ressortir ces boules de la boîte festive et vous remémorer avec joie les beaux moments.',
    img: '/vid2.mp4',
    type: 'video',
  },
  {
    id: 2,
    title: 'Une décoration qui apporte de la joie',
    highlight: 'À vos proches et à votre famille',
    description:
      'Chaque boule est unique ! Chacune contient une part de votre chaleur et de vos souvenirs heureux. Tout est fait pour que vous et vos proches soyez ravis de ce cadeau. Merci de votre confiance !',
    img: '/features2.jpg',
    type: 'photo',
  },
  {
    id: 3,
    title: 'Incroyablement belles',
    highlight: 'Ensembles de boules photo',
    description:
      'Les boules photo en ensembles paraissent encore plus festives et élégantes. Une idée parfaite pour offrir à vos proches, amis ou collègues.',
    img: '/features3.jpg',
    type: 'photo',
  },
]

export default function ProductFeatures() {
  return (
    <section className="relative w-full bg-gradient-to-br from-yellow-50 via-white to-green-50 py-16">
      {/* cercles décoratifs lumineux */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-30" />

      <div className="max-w-6xl mx-auto px-4 space-y-24 relative z-10">
        {features.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            viewport={{ once: true }}
            className={`grid gap-10 lg:grid-cols-2 items-center ${
              i % 2 === 1 ? 'lg:grid-flow-dense' : ''
            }`}
          >
            {/* Photo */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-red-200 to-green-200 rounded-3xl blur opacity-30 group-hover:opacity-50 transition" />
              {f.type === 'video' ? (
                <video
                  autoPlay
                  playsInline
                  loop
                  muted
                  className="relative w-full md:max-w-[500px] max-h-[380px] object-cover rounded-3xl shadow-xl transform group-hover:scale-105 transition duration-500"
                  src={f.img}
                ></video>
              ) : (
                <img
                  src={f.img}
                  alt={f.title}
                  className="relative w-full md:max-w-[500px] max-h-[380px] object-cover rounded-3xl shadow-xl transform group-hover:scale-105 transition duration-500"
                />
              )}
            </div>

            {/* Texte */}
            <div className="space-y-5">
              <h3 className="text-lg font-semibold text-gray-600 uppercase tracking-wide">
                {f.title}
              </h3>
              <h2 className="text-3xl font-extrabold text-green-700 uppercase relative inline-block">
                {f.highlight}
                <span className="absolute left-0 -bottom-1 w-full h-2 bg-green-200 -z-10 rounded-full"></span>
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {f.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
