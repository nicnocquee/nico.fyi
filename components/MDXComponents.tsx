import TOCInline from 'pliny/ui/TOCInline'
import CustomPre from './Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import CustomLink from './Link'
import AutocompleteSection from './autocomplete-section'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { LanguageSelectDemo } from './language-select-demo'
import ZoomableImage from './zoomable-image'

export const components: MDXComponents = {
  Image: ZoomableImage,
  TOCInline,
  a: CustomLink,
  pre: CustomPre,
  BlogNewsletterForm,
  AutocompleteSection,
  RadioGroup,
  RadioGroupItem,
  LanguageSelectDemo,
}
