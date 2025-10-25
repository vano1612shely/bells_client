import { Button } from '@/shared/components/ui/button'
import { Upload } from 'lucide-react'
import { useRef } from 'react'

export function UploadPhotoField({ field }: { field: any }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      field.handleChange({
        originImage: file,
        image: null,
      })
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {/* прихований input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* кнопка замість input */}
      <Button type="button" variant="outline" onClick={handleClick}>
        <Upload className="w-4 h-4 mr-2" />
        Télécharger une photo
      </Button>

      <p className="text-xs text-muted-foreground mt-1">
        Téléchargez la photo qui sera sur la boule
      </p>
    </div>
  )
}
