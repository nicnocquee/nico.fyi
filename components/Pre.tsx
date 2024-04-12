import Pre from 'pliny/ui/Pre'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  children?: React.ReactNode
}

const CustomPre = ({ children, ...props }: Props) => {
  return <Pre {...props}>{children || ''}</Pre>
}

export default CustomPre
