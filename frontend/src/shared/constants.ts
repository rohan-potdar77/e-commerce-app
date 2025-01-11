export enum APP_USERS {
    ADMINISTRATOR = 'Administrator',
    USER = 'User',
}

export enum CurrencyCode {
    INR = 'INR',
    USD = 'USD',
    EUR = 'EUR',
}

export enum FilterConfig {
    MIN_PRICE = 0,
    MAX_PRICE = 100000,
    INTERVAL = 20000,
}

export type Categories =
    | 'Electronic'
    | 'Cloth'
    | 'Furniture'
    | 'Toy'
    | 'Mobile'
    | 'TV'
    | 'Sport'
    | 'Computer'
    | 'Utensil'
    | 'Other'
    | 'Shoe';

export type SeverityProps = 'error' | 'info' | 'success' | 'warning';

export type Anchor = 'bottom' | 'left' | 'top' | 'right';

export interface ResponseDataStructure {
    success: boolean;
    message: string;
    data: unknown;
}

export interface Product {
    _id: string;
    productName: string;
    productDescription: string;
    productBrand: string;
    productCategory:
        | 'Electronic'
        | 'Cloth'
        | 'Furniture'
        | 'Toy'
        | 'Mobile'
        | 'TV'
        | 'Sport'
        | 'Computer'
        | 'Utensil'
        | 'Other'
        | 'Shoe';
    price: number;
    currency: 'INR' | 'USD' | 'EUR';
    discount: number;
    totalQuantity: number;
    isAvailable: boolean;
    specifications: Record<string, unknown>;
    features: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Variant {
    _id: string;
    productId: string;
    variantName: string;
    variantDescription: Record<string, unknown> | null;
    variantQuantity: number;
    isAvailable: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    _id: string;
    product: Product;
    variant: Variant | null;
    orderQuantity: number;
}
