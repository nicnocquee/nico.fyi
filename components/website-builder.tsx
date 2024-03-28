import { ComponentType, createContext, useContext } from 'react'

export const defaultWebsiteBuilderValue = {
  Link: ({ href, children }) => <a href={href}>{children}</a>,
  // eslint-disable-next-line @next/next/no-img-element
  Image: ({ src, alt }) => <img alt={alt || ''} src={src} />,
  Heading: ({ level, children }) => {
    switch (level) {
      case 1:
        return <h1>{children}</h1>
      case 2:
        return <h2>{children}</h2>
      case 3:
        return <h3>{children}</h3>
      case 4:
        return <h4>{children}</h4>
      case 5:
        return <h5>{children}</h5>
      case 6:
        return <h6>{children}</h6>
      default:
        return <h3>{children}</h3>
    }
  },
  Paragraph: ({ children }) => <p>{children}</p>,
  List: ({ ordered, children }) => <ol>{ordered ? <li>{children}</li> : children}</ol>,
  Table: ({ children }) => <table>{children}</table>,
  Code: ({ children }) => <code>{children}</code>,
  Blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  Pre: ({ children }) => <pre>{children}</pre>,
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
