import { envConfig } from '../constants/config';
import { TokenType, UserVerifyStatus } from '../constants/enum';
import { USER_MESSAGES } from '../constants/message';
import {
  CreateUserBody,
  FindUserOptions,
  LoginReqBody,
  RegisterReqBody,
  UserType
} from '../models/requets/user.requests';
import { myDataSource } from '../orm/connectDb';
import { DistrictOfficier } from '../orm/entities/DistrictOfficier';
import { RefreshToken } from '../orm/entities/RefreshToken';
import { User } from '../orm/entities/User';
import { Ward } from '../orm/entities/Ward';
import { WardOfficier } from '../orm/entities/WardOfficier';
import { hashPassword } from '../utils/crypto';
import { signToken, verifyToken } from '../utils/jwt.utils';
import { logger } from '../utils/logging.util';
import { sendEmail } from '../utils/mailing.util';
import { randomPassword } from '../utils/random.util';

class UserService {
  private userRepository = myDataSource.getRepository(User);
  private wardOfficerRepository = myDataSource.getRepository(WardOfficier);
  private districtOfficerRepository = myDataSource.getRepository(DistrictOfficier);
  private refreshTokenRepository = myDataSource.getRepository(RefreshToken);

  async createAccount(payload: CreateUserBody) {
    const user = new User();
    user.email = payload.email;
    const password = payload.password;
    user.password = hashPassword(password);
    user.userType = payload.userType;
    const savedUser = await this.userRepository.save(user);

    if (payload.userType === UserType.WARD_OFFICER) {
      const wardOfficier = new WardOfficier();
      wardOfficier.id = payload.wardId;
      wardOfficier.userId = savedUser.id;
      wardOfficier.manageWardId = payload.wardId;
      await this.wardOfficerRepository.save(wardOfficier);
    } else if (payload.userType === UserType.DISTRICT_OFFICER) {
      const districtOfficier = new DistrictOfficier();
      districtOfficier.id = payload.districtId;
      districtOfficier.userId = savedUser.id;
      districtOfficier.manageDistrictId = payload.districtId;
      await this.districtOfficerRepository.save(districtOfficier);
    }

    logger.info('User created', {
      userId: user.id,
      email: user.email,
      // Add more fields as needed
    });
    return savedUser;
  }

  async createAccountDepartmentOfficer(payload: RegisterReqBody) {
    const user = new User();
    user.email = payload.email;
    user.password = hashPassword('superadmin');
    user.userType = UserType.DEPARTMENT_OFFICER;
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async login({ userId, userType, fcmToken }: { userId: number; userType: UserType; fcmToken: string }) {
    const [newAccessToken, newRefreshToken] = await this.signAccessAndRefreshToken({
      userId,
      userType,
      fcmToken
    });
    const { iat, exp } = await this.decodeRefreshToken(newRefreshToken as string);
    const refreshToken = new RefreshToken();

    Object.assign(refreshToken, {
      userId,
      token: newRefreshToken,
      iat: new Date(iat * 1000),
      exp: new Date(iat * 1000)
    });

    await this.refreshTokenRepository.save(refreshToken);

    return {
      userType,
      newAccessToken,
      newRefreshToken
    };
  }

  async logout(refreshToken: string) {
    const result = await this.refreshTokenRepository.delete({ token: refreshToken });
    return {
      message: USER_MESSAGES.LOGOUT_SUCCESS
    };
  }

  findUserByEmail = async ({ email }: { email: string }) => {
    return await this.userRepository.findOneBy({
      email
    });
  };

  // Hàm tìm user theo các trường được truyền vào
  findUserByOptions = async (options: FindUserOptions): Promise<User | undefined> => {
    return await this.userRepository.findOne({ where: [options] });
  };

  signAccessAndRefreshToken = ({
    userId,
    userType,
    fcmToken
  }: {
    userId: number;
    userType: UserType;
    fcmToken: string;
  }) => {
    return Promise.all([this.signAccessToken({ userId, userType, fcmToken }), this.signRefreshToken({ userId })]);
  };

  private signAccessToken({ userId, userType, fcmToken }: { userId: number; userType: UserType; fcmToken: string }) {
    return signToken({
      payload: {
        userId,
        userType,
        fcmToken,
        token_type: TokenType.AccessToken
      },
      privateKey: envConfig.jwtSecretAccessToken,
      options: {
        expiresIn: envConfig.accessTokenExpiresIn
      }
    });
  }
  private signRefreshToken({ userId, exp }: { userId: number; exp?: number }) {
    if (exp) {
      return signToken({
        payload: {
          userId,
          token_type: TokenType.RefreshToken,
          exp
        },
        privateKey: envConfig.jwtSecretRefreshToken
      });
    }
    return signToken({
      payload: {
        userId,
        token_type: TokenType.RefreshToken
      },
      privateKey: envConfig.jwtSecretRefreshToken,
      options: {
        expiresIn: envConfig.refreshTokenExpiresIn
      }
    });
  }
  private decodeRefreshToken(refreshToken: string) {
    return verifyToken(refreshToken, envConfig.jwtSecretRefreshToken);
  }

  async getWardOfficerByUserId(userId: number) {
    return await this.wardOfficerRepository.findOneBy({
      userId
    });
  }

  async getDistrictOfficerByUserId(userId: number) {
    return await this.districtOfficerRepository.findOneBy({
      userId
    });
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      // Random password and hash
      const password = randomPassword();
      const hashedPassword = hashPassword(password);

      // Update password in database
      user.password = hashedPassword;
      const userSaved = this.userRepository.save(user);

      // Send mail
      sendEmail(email, 'Forgot Password - Reset Your Password', password);
      return userSaved;
    }
  }

  async changePassword(newPassword: string, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (user) {
      // Hash new password
      const hashedPassword = hashPassword(newPassword);
      // Update password in database
      user.password = hashedPassword;
      const userSaved = this.userRepository.save(user);

      return userSaved;
    }
  }

  async updateUser(user: User) {
    return await this.userRepository.save(user);
  }
}

export default new UserService();
