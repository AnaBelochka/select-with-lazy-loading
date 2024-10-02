export type DataType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    job?: string;
};

export type MetaType = {
    from: number;
    to: number;
    total: number;
};

export type SelectDataResponse = {
    data: DataType[];
    meta: MetaType;
};