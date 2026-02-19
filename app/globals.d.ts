declare module '*.css'

declare namespace JSX {
  interface IntrinsicElements {
    'w3m-button': {
      size?: 'md' | 'sm'
      label?: string
      loadingLabel?: string
      disabled?: boolean
      balance?: 'show' | 'hide'
    }
  }
}