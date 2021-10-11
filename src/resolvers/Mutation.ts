import { login, signup } from '../utils/mutations/user';
import { addBook, addAuthor, addPublisher } from '../utils/mutations/mutations';

export const Mutation = {
    signup: signup,
    login: login,
    
    addBook: addBook,
    addAuthor: addAuthor,
    addPublisher: addPublisher
}
