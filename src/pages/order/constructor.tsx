import { useEffect, useRef, useState } from 'react'
import { Canvas, Circle, Image } from 'fabric'
import { Edit2, RotateCw, ZoomIn, ZoomOut } from 'lucide-react'
import type { Canvas as CanvasType, Image as FabricImage } from 'fabric'
import { Button } from '@/shared/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog.tsx'

interface BallPhotoEditorProps {
  file: File | null
  onChange?: (file: File) => void
}

interface BallPhotoEditorProps {
  file: File | null
  onChange?: (file: File) => void
}

export const BallPhotoEditor: React.FC<BallPhotoEditorProps> = ({
  file,
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // 🆕 Зберігаємо трансформації (масштаб, позицію, кут)
  const [transform, setTransform] = useState<{
    scale: number
    left: number
    top: number
    angle: number
  } | null>(null)

  const handleFileLoad = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => setPreviewUrl(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (file) {
      handleFileLoad(file)
    }
  }, [file])

  const handleSaveEdited = (newFile: File, transformData: any) => {
    onChange?.(newFile)
    handleFileLoad(newFile)
    setTransform(transformData) // 🆕 зберігаємо стан
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[350px] h-[350px] rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border border-border">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="ball preview"
            className="object-cover w-full h-full"
            style={{ clipPath: 'circle(50% at 50% 50%)' }}
          />
        ) : (
          <div className="text-gray-400">Фото не завантажено</div>
        )}
      </div>

      {previewUrl && (
        <Button
          variant="outline"
          type="button"
          onClick={() => setIsModalOpen(true)}
        >
          <Edit2 className="w-4 h-4 mr-2" /> Modifier
        </Button>
      )}

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent className="w-auto md:min-w-[550px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Édition de la photo</AlertDialogTitle>
          </AlertDialogHeader>
          <BallEditorCanvas
            file={file}
            initialTransform={transform}
            onChange={handleSaveEdited}
          />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

interface BallEditorCanvasProps {
  file: File | null
  initialTransform?: {
    scale: number
    left: number
    top: number
    angle: number
  } | null
  onChange?: (file: File, transform: any) => void
}

const BallEditorCanvas: React.FC<BallEditorCanvasProps> = ({
  file,
  initialTransform,
  onChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fabricCanvasRef = useRef<CanvasType | null>(null)
  const imageRef = useRef<FabricImage | null>(null)

  const CANVAS_SIZE = 500
  const BALL_RADIUS = 160

  useEffect(() => {
    if (!canvasRef.current) return

    // 🧹 Якщо був попередній canvas — видаляємо перед створенням нового
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose()
      fabricCanvasRef.current = null
    }

    const canvas = new Canvas(canvasRef.current, {
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      backgroundColor: '#f9fafb',
      preserveObjectStacking: true,
    })
    fabricCanvasRef.current = canvas

    // Контур кульки
    const outline = new Circle({
      radius: BALL_RADIUS,
      left: CANVAS_SIZE / 2,
      top: CANVAS_SIZE / 2,
      stroke: '#3b82f6',
      strokeWidth: 4,
      fill: 'transparent',
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false,
    })
    canvas.add(outline)
    canvas.moveObjectTo(outline, canvas.getObjects().length - 1)

    if (file) loadImage(file)

    // 🧹 При розмонтуванні — звільняємо
    return () => {
      canvas.dispose()
      fabricCanvasRef.current = null
      imageRef.current = null
    }
  }, [file])

  const loadImage = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imgElement = document.createElement('img')
      imgElement.src = e.target?.result as string

      imgElement.onload = () => {
        if (imageRef.current && fabricCanvasRef.current) {
          fabricCanvasRef.current.remove(imageRef.current)
          imageRef.current = null
        }

        const img = new Image(imgElement, {
          originX: 'center',
          originY: 'center',
          cornerStyle: 'circle',
          cornerSize: 10,
          transparentCorners: false,
          lockUniScaling: true,
          hasBorders: true,
          hasControls: true,
          uniformScaling: true,
        })

        img.setControlsVisibility({
          mt: false, // верхній середній
          mb: false, // нижній середній
          ml: false, // лівий середній
          mr: false, // правий середній
        })

        const scale = Math.max(
          (BALL_RADIUS * 2) / img.width,
          (BALL_RADIUS * 2) / img.height,
        )

        if (initialTransform) {
          img.scale(initialTransform.scale)
          img.set({
            left: initialTransform.left,
            top: initialTransform.top,
            angle: initialTransform.angle,
          })
        } else {
          img.scale(scale)
          img.set({
            left: CANVAS_SIZE / 2,
            top: CANVAS_SIZE / 2,
          })
        }

        imageRef.current = img
        fabricCanvasRef.current!.add(img)
        fabricCanvasRef.current!.moveObjectTo(img, 0)
        fabricCanvasRef.current!.setActiveObject(img)
        fabricCanvasRef.current!.renderAll()
      }
    }
    reader.readAsDataURL(file)
  }

  const saveImage = async () => {
    if (!fabricCanvasRef.current || !onChange) return

    const canvas = fabricCanvasRef.current
    const img = imageRef.current
    if (!img) return

    canvas.discardActiveObject()
    canvas.renderAll()

    // Створюємо тимчасовий canvas для експорту
    const tempCanvas = document.createElement('canvas')
    const diameter = BALL_RADIUS * 2
    tempCanvas.width = diameter
    tempCanvas.height = diameter
    const ctx = tempCanvas.getContext('2d')!

    // Малюємо прозорий фон
    ctx.clearRect(0, 0, diameter, diameter)

    // Створюємо круглу маску
    ctx.save()
    ctx.beginPath()
    ctx.arc(BALL_RADIUS, BALL_RADIUS, BALL_RADIUS, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()

    // Зміщуємо систему координат так, щоб центр кола був у (0, 0)
    ctx.translate(BALL_RADIUS, BALL_RADIUS)

    // Застосовуємо трансформації зображення
    ctx.rotate(((img.angle || 0) * Math.PI) / 180)
    ctx.scale(img.scaleX || 1, img.scaleY || 1)

    // Обчислюємо позицію зображення відносно центру кола на основному canvas
    const imgLeft = (img.left || CANVAS_SIZE / 2) - CANVAS_SIZE / 2
    const imgTop = (img.top || CANVAS_SIZE / 2) - CANVAS_SIZE / 2

    // Малюємо зображення з урахуванням його originX/originY
    const imgElement = img.getElement() as HTMLImageElement
    ctx.drawImage(
      imgElement,
      imgLeft - imgElement.width / 2,
      imgTop - imgElement.height / 2,
      imgElement.width,
      imgElement.height,
    )

    ctx.restore()

    // Конвертуємо в файл
    const dataURL = tempCanvas.toDataURL('image/png', 1)
    const blob = await fetch(dataURL).then((r) => r.blob())
    const newFile = new File([blob], file!.name.replace(/\.[^.]+$/, '.png'), {
      type: 'image/png',
    })

    const transform = {
      scale: img.scaleX || 1,
      left: img.left || CANVAS_SIZE / 2,
      top: img.top || CANVAS_SIZE / 2,
      angle: img.angle || 0,
    }

    onChange(newFile, transform)
  }

  const zoomIn = () => {
    if (!imageRef.current) return
    imageRef.current.scale(imageRef.current.scaleX * 1.1)
    fabricCanvasRef.current?.renderAll()
  }

  const zoomOut = () => {
    if (!imageRef.current) return
    imageRef.current.scale(imageRef.current.scaleX * 0.9)
    fabricCanvasRef.current?.renderAll()
  }

  const rotate = () => {
    if (!imageRef.current) return
    const angle = imageRef.current.angle || 0
    imageRef.current.rotate((angle + 15) % 360)
    fabricCanvasRef.current?.renderAll()
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas ref={canvasRef} className="border rounded-md shadow-sm" />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={zoomIn}>
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={zoomOut}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={rotate}>
          <RotateCw className="w-4 h-4" />
        </Button>
        <Button size="sm" onClick={saveImage}>
          Enregistrer
        </Button>
      </div>
    </div>
  )
}
