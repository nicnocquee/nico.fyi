import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export default function ZoomableImage({
  src,
  alt,
  className,
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  if (!src) return null
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={src}
          alt={alt || ''}
          sizes="100vw"
          className={cn('overflow-clip rounded-md shadow-lg', className)}
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={500}
          height={100}
        />
      </DialogTrigger>
      <DialogContent className="max-w-7xl border-0 bg-transparent p-0">
        <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
          <Image src={src} fill alt={alt || ''} className="h-full w-full object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
