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
  isEdited?: boolean
}

export const BallPhotoEditor: React.FC<BallPhotoEditorProps> = ({
  file,
  onChange,
  isEdited,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
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
    if (file) handleFileLoad(file)
  }, [file])
  useEffect(() => {
    if (!isEdited) setIsModalOpen(true)
  }, [isEdited])
  const handleSaveEdited = (newFile: File, transformData: any) => {
    onChange?.(newFile)
    handleFileLoad(newFile)
    setTransform(transformData)
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full overflow-hidden flex items-center justify-center bg-gray-100 border border-border">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="ball preview"
            className="object-cover w-full h-full"
            style={{ clipPath: 'circle(50% at 50% 50%)' }}
          />
        ) : (
          <div className="text-gray-400">Photo non téléchargée</div>
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
        <AlertDialogContent className="w-[95vw] max-w-[450px] overflow-y-auto max-h-[90vh] p-3 sm:p-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Retouche photo</AlertDialogTitle>
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

  const [canvasSize, setCanvasSize] = useState(400)

  // 🔹 Динамічне визначення розміру canvas
  useEffect(() => {
    const handleResize = () => {
      const size = Math.min(window.innerWidth - 40, 400)
      setCanvasSize(size)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const BALL_RADIUS = canvasSize / 3.2

  useEffect(() => {
    if (!canvasRef.current) return

    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose()
      fabricCanvasRef.current = null
    }

    const canvas = new Canvas(canvasRef.current, {
      width: canvasSize,
      height: canvasSize,
      backgroundColor: '#f9fafb',
      preserveObjectStacking: true,
    })
    fabricCanvasRef.current = canvas

    const outline = new Circle({
      radius: BALL_RADIUS,
      left: canvasSize / 2,
      top: canvasSize / 2,
      stroke: '#3b82f6',
      strokeWidth: 3,
      fill: 'transparent',
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false,
    })
    canvas.add(outline)

    if (file) loadImage(file)

    return () => {
      canvas.dispose()
      fabricCanvasRef.current = null
      imageRef.current = null
    }
  }, [file, canvasSize])

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
          lockUniScaling: true,
          hasControls: true,
          hasBorders: true,
          uniformScaling: true,
        })

        img.setControlsVisibility({
          mt: false,
          mb: false,
          ml: false,
          mr: false,
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
            left: canvasSize / 2,
            top: canvasSize / 2,
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

    const diameter = BALL_RADIUS * 2
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = diameter
    tempCanvas.height = diameter
    const ctx = tempCanvas.getContext('2d')!

    ctx.clearRect(0, 0, diameter, diameter)
    ctx.save()
    ctx.beginPath()
    ctx.arc(BALL_RADIUS, BALL_RADIUS, BALL_RADIUS, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()

    ctx.translate(BALL_RADIUS, BALL_RADIUS)
    ctx.rotate(((img.angle || 0) * Math.PI) / 180)
    ctx.scale(img.scaleX || 1, img.scaleY || 1)

    const imgLeft = (img.left || canvasSize / 2) - canvasSize / 2
    const imgTop = (img.top || canvasSize / 2) - canvasSize / 2
    const imgElement = img.getElement() as HTMLImageElement
    ctx.drawImage(
      imgElement,
      imgLeft - imgElement.width / 2,
      imgTop - imgElement.height / 2,
      imgElement.width,
      imgElement.height,
    )
    ctx.restore()

    const dataURL = tempCanvas.toDataURL('image/png', 1)
    const blob = await fetch(dataURL).then((r) => r.blob())
    const newFile = new File([blob], file!.name.replace(/\.[^.]+$/, '.png'), {
      type: 'image/png',
    })

    const transform = {
      scale: img.scaleX || 1,
      left: img.left || canvasSize / 2,
      top: img.top || canvasSize / 2,
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
      <canvas
        ref={canvasRef}
        className="border rounded-md shadow-sm w-full aspect-square"
      />
      <div className="flex flex-wrap justify-center gap-2 mt-2">
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
          Sauvegarder
        </Button>
      </div>
    </div>
  )
}
