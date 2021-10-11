import { getUsers, getUser } from '../utils/query/users';
import { getBooks, getBook } from '../utils/query/books';
import { getAuthors, getAuthor } from '../utils/query/authors';
import { getPublishers, getPublisher } from '../utils/query/publishers';

export const Query = {
    info: () => { return `This is a description`; },
    user: getUser,
    users: getUsers,

    book: getBook,
    books: getBooks,

    author: getAuthor,
    authors: getAuthors,

    publisher: getPublisher,
    publishers: getPublishers,
}
