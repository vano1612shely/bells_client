
export default function ProductLine() {
  const images = [
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
    '/4.jpg',
    '/img1.jpg',
    '/img2.jpg',
    '/img3.png',
    '/features1.jpg',
    '/features2.jpg',
    '/features3.jpg',
  ]

  return (
    <section className="w-full bg-gray-50 py-12">
      {/* Фото-стрічка */}
      <div className="overflow-hidden relative">
        <div className="flex w-max animate-scroll">
          {[...images, ...images].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`photo-${i}`}
              className="h-40 w-40 object-cover rounded-xl shadow-md mx-3"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
