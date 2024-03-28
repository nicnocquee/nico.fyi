export const DefaultLink = ({ href, children }) => <a href={href}>{children}</a>
// eslint-disable-next-line @next/next/no-img-element
export const DefaultImage = ({ src, alt }) => <img alt={alt || ''} src={src} />
export const DefaultHeading = ({ level, children }) => {
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
}
export const DefaultParagraph = ({ children }) => <p>{children}</p>
export const DefaultList = ({ ordered, children }) => (
  <ol>{ordered ? <li>{children}</li> : children}</ol>
)
export const DefaultTable = ({ children }) => <table>{children}</table>
export const DefaultCode = ({ children }) => <code>{children}</code>
export const DefaultBlockquote = ({ children }) => <blockquote>{children}</blockquote>
export const DefaultPre = ({ children }) => <pre>{children}</pre>
