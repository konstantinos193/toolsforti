declare module 'next/image' {
  import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

  export interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string
    alt: string
    width?: number
    height?: number
    fill?: boolean
    loader?: any
    quality?: number
    priority?: boolean
    loading?: 'lazy' | 'eager'
    placeholder?: 'blur' | 'empty'
    blurDataURL?: string
    unoptimized?: boolean
    onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number }) => void
  }

  export default function Image(props: ImageProps): JSX.Element
}

declare module 'next/link' {
  import { ComponentProps } from 'react'
  
  interface LinkProps extends ComponentProps<'a'> {
    href: string
    as?: string
    replace?: boolean
    scroll?: boolean
    shallow?: boolean
    passHref?: boolean
    prefetch?: boolean
  }
  
  export default function Link(props: LinkProps): JSX.Element
} 