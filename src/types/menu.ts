export interface Menu {
    id: number;
    authName: string;
    path: string | null;
    children: Menu[];
}
