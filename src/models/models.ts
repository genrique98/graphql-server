export type Book = {
    id: string,
    title: string,
    author: string,
    category: string
}

export type User = {
    id: string,
    name: string,
    email: string,
    username: string,
    password: string
}

export type AuthPayload = {
    token: string,
    user: User
}

export type Context = {
    id?: string,
    req: string
}