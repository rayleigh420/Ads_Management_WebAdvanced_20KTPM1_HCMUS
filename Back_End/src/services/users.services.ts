import { myDataSource } from '../orm/connectDb';
import { User } from '../orm/entities/User';

class UserService {
  private userRepository = myDataSource.getRepository(User);

  public register = async (user: User) => {
    return await this.userRepository.save(user);
  };

  findUserByEmail = async ({ email }: { email: string }) => {
    return await this.userRepository.findOneBy({
      email
    });
  };
}

export default new UserService();
