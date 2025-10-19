import { usePrice } from '@/modules/price'
import { formatPrice } from '@/shared/lib/utils.ts'

const products = [
  {
    id: 1,
    title: 'Boule photo "Or"',
    description:
      'Boule de Noël avec votre photo. D’un côté la photo, de l’autre un fond doré (voir la vidéo).',
    size: 'Diamètre : 8–10 cm.',
    material: 'Matériau : acrylique (résistant aux chocs !)',
    img: '/img1.jpg',
  },
  {
    id: 2,
    title: 'Boule photo "Deux photos"',
    description: 'Boule de Noël avec vos 2 photos (voir la vidéo).',
    size: 'Diamètre : 8–10 cm.',
    material: 'Matériau : acrylique (résistant aux chocs !)',
    img: '/img2.jpg',
  },
  {
    id: 3,
    title: 'Boule photo "Cadeau"',
    description:
      'Boule avec une de vos photos, et de l’autre côté un message de vœux + une boîte cadeau.',
    size: 'Diamètre : 8–10 cm.',
    material: 'Matériau : acrylique (résistant aux chocs !)',
    img: '/img3.png',
  },
]

export default function ProductGrid() {
  const { data } = usePrice()
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-center text-2xl font-bold text-green-700 mb-8">
          Catalogue des produits
        </h2>

        {/* Grille */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {/* Photo */}
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-56 object-cover"
              />

              {/* Contenu */}
              <div className="flex-1 p-4 flex flex-col">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{p.description}</p>
                <p className="text-sm text-gray-500">{p.size}</p>
                <p className="text-sm text-gray-500 mb-4">{p.material}</p>

                {/* Prix */}
                <div className="mt-auto">
                  <p className="text-red-600 font-bold text-lg mb-3">
                    {data?.price && formatPrice(data.price)}
                  </p>
                  <button
                    onClick={() => {
                      const el = document.getElementById('order')
                      if (el) {
                        el.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        })
                      }
                    }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-medium"
                  >
                    Commander
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
