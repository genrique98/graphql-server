export type Book_model = {
    id: string,
    title: string,
    category: string,
    author_id: number,
    publisher_id: number
};

export type User_model = {
    id: string,
    name: string,
    email: string,
    username: string,
    password: string
};

export type Author_model = {
    id: string,
    name: string,
    lastName: string,
    bio: string
};
  
export type Publisher_model = {
    id: string,
    name: string
};

export type AuthPayload = {
    token: string,
    user: User_model
};

export type Context = {
    id?: string,
    req: string
};