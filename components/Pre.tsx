import Pre from 'pliny/ui/Pre'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  children?: React.ReactNode
}

const CustomPre = ({ children, ...props }: Props) => {
  return (
    <div className="[&_code.language-markdown]:text-wrap">
      <Pre {...props}>{children || ''}</Pre>
    </div>
  )
}

export default CustomPre
