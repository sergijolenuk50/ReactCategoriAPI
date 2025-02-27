export interface ICategoryItem {
    id: number,
    name: string,
    image: string,
    description: string,
}

// CategoryModel.ts
export interface ICategoryPostRequest {
    name: string;
    image: File|null;
    description: string;
}

export interface ICategoryPutRequest extends Partial<ICategoryPostRequest> {
    id: number;
}