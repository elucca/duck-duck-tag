// See app/utils and app/reducers for more type definitions

export interface Tag {
    id: string;
    service: string;
    label: string;
    accuracy: number;
}

export interface Path {
    type: string; // 'url' or 'localPath'
    path: string;
    selected: boolean;
}
