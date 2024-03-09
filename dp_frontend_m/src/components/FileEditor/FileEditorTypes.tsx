export interface IDescription {
    id: number
    name: string
    description: string
    owner: any;
    size: string
    created_at: string
    last_download: string
    file?: string
    free_file: boolean
    url: string
}

export interface Owner {
    username: string
}

export interface IProps {
    data: IDescription
}

export interface IPropsList {
    data: IDescription[]
}

export interface SendChangeForm {
    description: string,
    free_file: boolean
}