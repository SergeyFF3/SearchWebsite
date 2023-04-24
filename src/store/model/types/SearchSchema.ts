export interface UrlsProps {
    regular?: string
    small?: string
    thumb?: string
}

export interface ResultProps {
    id?: string
    urls?: UrlsProps
}

export interface DataProps {
    results?: ResultProps[]
}

export interface SearchSchema {
    data?: ResultProps[]
    isLoading?: boolean
    error?: string | unknown
    noResult?: string
    url?: string
    page?: number
}