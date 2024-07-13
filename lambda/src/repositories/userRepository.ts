import User from '../model/user';

export interface IUserRepository {
  save(user: User);
  searchAll();
  searchById(idUser: number);
  searchByUserName(username: string);
  update(user: User);
  alterPassword(id: number, password: string);
}

class UserRepository implements IUserRepository {
  save(user: User) {
    throw new Error('Method not implemented.');
  }
  searchAll() {
    throw new Error('Method not implemented.');
  }
  searchById(idUser: number) {
    throw new Error('Method not implemented.');
  }
  searchByUserName(username: string) {
    throw new Error('Method not implemented.');
  }
  update(user: User) {
    throw new Error('Method not implemented.');
  }
  alterPassword(id: number, password: string) {
    throw new Error('Method not implemented.');
  }
}

export default new UserRepository();
