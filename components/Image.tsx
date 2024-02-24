import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => (
  <NextImage className="duration-700 ease-spring-4 hover:scale-105" {...rest} />
)

export default Image
