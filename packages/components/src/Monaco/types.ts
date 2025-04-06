export interface IMonacoProps {
    value?: string
    defaultValue?: string
    onChange?(e?: string): void
    language?: 'json' | 'javascript'
    defaultLanguage?: string
    height?: string
    theme?: "vs-dark" | 'light'
}