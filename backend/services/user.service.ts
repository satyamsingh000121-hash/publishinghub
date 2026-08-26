import { UserRepository } from "@/backend/repositories/user.repository";
import { UserDTO } from "@/types/user";

export class UserService {
  static async getAllUsers(params?: { page?: number; limit?: number; search?: string }) {
    return UserRepository.findAll(params);
  }

  static async getUserById(id: string): Promise<UserDTO | null> {
    const user = await UserRepository.findById(id);
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as any,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static async updateUser(
    id: string,
    data: { name?: string; phoneNumber?: string; avatar?: string }
  ): Promise<UserDTO> {
    const user = await UserRepository.update(id, data);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as any,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static async deleteUser(id: string): Promise<boolean> {
    await UserRepository.delete(id);
    return true;
  }
}
