import { prisma } from "@/lib/prisma";
import { UserDTO } from "@/types/user";

export class UserRepository {
  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  static async create(data: {
    name: string;
    email: string;
    passwordHash: string;
    role?: string;
    phoneNumber?: string;
    avatar?: string;
    passwordResetTokenHash?: string | null;
    passwordResetExpires?: Date | null;
  }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash,
        role: data.role || "USER",
        phoneNumber: data.phoneNumber,
        avatar: data.avatar,
        passwordResetTokenHash: data.passwordResetTokenHash,
        passwordResetExpires: data.passwordResetExpires,
      },
    });
  }

  static async findByResetTokenHash(tokenHash: string) {
    return prisma.user.findFirst({
      where: {
        passwordResetTokenHash: tokenHash,
        passwordResetExpires: {
          gt: new Date(),
        },
      },
    });
  }

  static async updatePasswordAndClearToken(userId: string, newPasswordHash: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        passwordHash: newPasswordHash,
        passwordResetTokenHash: null,
        passwordResetExpires: null,
      },
    });
  }

  static async setPasswordResetToken(userId: string, tokenHash: string, expires: Date) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        passwordResetTokenHash: tokenHash,
        passwordResetExpires: expires,
      },
    });
  }

  static async update(
    id: string,
    data: {
      name?: string;
      phoneNumber?: string;
      avatar?: string;
      passwordHash?: string;
      passwordResetTokenHash?: string | null;
      passwordResetExpires?: Date | null;
    }
  ) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }

  static async findAll(params?: { page?: number; limit?: number; search?: string }) {
    const page = params?.page || 1;
    const limit = params?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (params?.search) {
      where.OR = [
        { name: { contains: params.search } },
        { email: { contains: params.search } },
      ];
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true,
          phoneNumber: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
    ]);

    return {
      users: users as UserDTO[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
