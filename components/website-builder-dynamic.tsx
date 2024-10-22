import dynamic from 'next/dynamic'
import { ComponentType, createContext, useContext } from 'react'

export const defaultWebsiteBuilderValue = {
  Link: dynamic(() =>
    import('./website-builder-components').then((m) => ({
      default: m.DefaultLink,
    }))
  ),
  // eslint-disable-next-line @next/next/no-img-element
  Image: dynamic(() =>
    import('./website-builder-components').then((m) => ({
      default: m.DefaultImage,
    }))
  ),
  Heading: dynamic(() =>
    import('./website-builder-components').then((m) => ({
      default: m.DefaultHeading,
    }))
  ),
  Paragraph: dynamic(() =>
    import('./website-builder-components').then((m) => ({
      default: m.DefaultParagraph,
    }))
  ),
  List: dynamic(() =>
    import('./website-builder-components').then((m) => ({
      default: m.DefaultList,
    }))
  ),
  Table: dynamic(() =>
    import('./website-builder-components').then((m) => ({
      default: m.DefaultTable,
    }))
  ),
  Code: dynamic(() =>
    import('./website-builder-components').then((m) => ({
      default: m.DefaultCode,
    }))
  ),
  Blockquote: dynamic(() =>
    import('./website-builder-components').then((m) => ({
      default: m.DefaultBlockquote,
    }))
  ),
  Pre: dynamic(() =>
    import('./website-builder-components').then((m) => ({
      default: m.DefaultPre,
    }))
  ),
}

const WebsiteBuilderContext = createContext<{
  Link: ComponentType<{ href: string; children: React.ReactNode }>
  Image: ComponentType<{ src: string; alt: string }>
  Heading: ComponentType<{ level: number; children: React.ReactNode }>
  Paragraph: ComponentType<{ children: React.ReactNode }>
  List: ComponentType<{ ordered: boolean; children: React.ReactNode }>
  Table: ComponentType<{ children: React.ReactNode }>
  Code: ComponentType<{ children: React.ReactNode }>
  Blockquote: ComponentType<{ children: React.ReactNode }>
  Pre: ComponentType<{ children: React.ReactNode }>
}>(defaultWebsiteBuilderValue)

export const WebsiteBuilderProvider = WebsiteBuilderContext.Provider

export const useWebsiteBuilder = () => useContext(WebsiteBuilderContext)
