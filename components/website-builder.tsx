import { ComponentType, createContext, useContext } from 'react'

export const defaultWebsiteBuilderValue = {
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
  // eslint-disable-next-line @next/next/no-img-element
  Image: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt || ''} src={src} />
  ),
  Heading: ({ level, children }: { level: number; children: React.ReactNode }) => {
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
  Paragraph: ({ children }: { children: React.ReactNode }) => <p>{children}</p>,
  List: ({ ordered, children }: { ordered: boolean; children: React.ReactNode }) => (
    <ol>{ordered ? <li>{children}</li> : children}</ol>
  ),
  Table: ({ children }: { children: React.ReactNode }) => <table>{children}</table>,
  Code: ({ children }: { children: React.ReactNode }) => <code>{children}</code>,
  Blockquote: ({ children }: { children: React.ReactNode }) => <blockquote>{children}</blockquote>,
  Pre: ({ children }: { children: React.ReactNode }) => <pre>{children}</pre>,
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
