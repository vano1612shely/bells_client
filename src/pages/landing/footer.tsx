import { MapPin, Phone, Timer, User } from 'lucide-react'

export const LandingFooter = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2">
        {/* Contacts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-3 border-b border-green-400 inline-block pb-1">
            Contacts
          </h3>
          <p className="flex items-center gap-2">
            <MapPin className="text-green-400" size={18} />
            Lyon, Rue de la République 28
          </p>
          <p className="flex items-center gap-2">
            <User className="text-green-400" size={18} />
            VRE DECO
          </p>
          <p className="flex items-center gap-2">
            <Phone className="text-green-400" size={18} />
            <a
              href="tel:+3363185128"
              className="hover:text-green-300 transition"
            >
              +33&nbsp;6&nbsp;31&nbsp;85&nbsp;12&nbsp;8
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Timer className="text-green-400" size={18} /> 9h00 – 20h00
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Tous droits réservés
      </div>
    </footer>
  )
}
