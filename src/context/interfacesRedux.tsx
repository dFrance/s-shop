export interface StoreProps {
    products: ProductProps[],
    checkout: CheckoutProps[],
    user: UserProps,
    status?: string | null,
}

export interface UserProps {
    logged: boolean;
}

export interface CheckoutProps {
    name: string,
    description: string,
    price: number,
    quantity: number,
    selected: boolean,
    _id: number,
}

export interface ProductProps {
    name: string,
    description: string,
    price: number,
    quantity: number,
    selected: boolean,
    _id: number,
}