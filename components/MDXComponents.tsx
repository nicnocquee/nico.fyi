import TOCInline from 'pliny/ui/TOCInline'
import CustomPre from './Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import AutocompleteSection from './autocomplete-section'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { LanguageSelectDemo } from './language-select-demo'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: CustomPre,
  BlogNewsletterForm,
  AutocompleteSection,
  RadioGroup,
  RadioGroupItem,
  LanguageSelectDemo,
}
