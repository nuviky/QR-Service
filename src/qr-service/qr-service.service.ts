import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../config/db/prisma.service';
import { ProfileDto } from './dto/profile.dto';
import { ConfigService } from '@nestjs/config';
import { errorsHandler } from '../common/errors-handler';
import { Visitor, Reader } from '@prisma/client';
import { v4 as uuid } from 'uuid';

@Injectable()
export class QrServiceService {
	constructor(
		private readonly JWTService: JwtService,
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService
	) {}

	async createToken(header: string) {
		const { uid, reader_number } = await this.getProfile(header);
		if (!reader_number) {
			const visitor = await this.getVisitor(uid);
			const token = await this.generateToken(visitor.uuid, visitor.creds);
			return { data: token };
		}
		const reader = await this.getReader(uid);
		const token = await this.generateToken(reader.uuid, reader.creds);
		return { data: token };
	}

	async verificationToken(header: string) {
		try {
			const decToken = await this.JWTService.verifyAsync(header, {
				secret: this.configService.get('SECRETKEY')
			});

			if (!decToken.creds) {
				const readerChildUser = await this.prisma.readerChildren
					.update({
						where: {
							uuid: decToken.uuid
						},
						data: {
							updatedAt: new Date()
						}
					})
					.catch(errorsHandler);

				if (readerChildUser && readerChildUser.finishedAt > new Date()) {
					return {
						library_cart: null,
						is_child: true
					};
				}
				new HttpException('Токен не найден', 404);
			}

			const readerUser = await this.prisma.reader
				.update({
					where: {
						uuid: decToken.uuid,
						creds: decToken.creds
					},
					data: {
						updatedAt: new Date(),
						creds: uuid()
					}
				})
				.catch(errorsHandler);

			const visitorUser = await this.prisma.visitor
				.update({
					where: {
						uuid: decToken.uuid,
						creds: decToken.creds
					},
					data: {
						updatedAt: new Date(),
						creds: uuid()
					}
				})
				.catch(errorsHandler);

			if (!readerUser && !visitorUser) {
				new HttpException('Токен не найден', 404);
			}
			if (readerUser) {
				const { reader_number } = await this.getProfile(readerUser.profileId);
				return {
					library_cart: reader_number,
					is_child: false
				};
			}
			if (visitorUser && visitorUser.finishedAt > new Date()) {
				return {
					library_cart: null,
					is_child: false
				};
			}
		} catch (error) {
			throw new HttpException('Токен не найден', 404);
		}
		throw new HttpException('Токен не найден', 404);
	}
	async getProfile(header: string) {
		//Заглушка
		return { uid: '2' } as ProfileDto;
	}

	async getVisitor(profileId: string) {
		const finishedAt = await this.getFinishedAtDate();
		const visitor = await this.prisma.visitor.upsert({
			where: {
				profileId: profileId
			},
			update: {
				updatedAt: new Date()
			},
			create: {
				profileId: profileId,
				finishedAt: finishedAt
			}
		});
		if (visitor.finishedAt > new Date()) {
			return visitor;
		}
		throw new HttpException('Истек срок действия пропуска', 403);
	}

	async getFinishedAtDate() {
		const nowDate = new Date();
		const res = new Date(nowDate.setDate(nowDate.getDate() + 1));
		return res.toISOString();
	}

	async getReader(profileId: string) {
		const reader = await this.prisma.reader.upsert({
			where: {
				profileId: profileId
			},
			update: {
				updatedAt: new Date()
			},
			create: {
				profileId: profileId
			}
		});
		return reader;
	}

	async generateToken(uuid: string, creds: string) {
		return this.JWTService.sign(
			{ uuid, creds },
			{
				secret: this.configService.get('SECRETKEY'),
				expiresIn: this.configService.get('EXPIRESIN')
			}
		);
	}

	async getVerifiedUser(
		uuid: string,
		creds: string
	): Promise<void | Reader | Visitor> {
		const user = await this.prisma.reader
			.findFirst({
				where: {
					uuid: uuid,
					creds: creds
				}
			})
			.catch(errorsHandler);
		if (!user) {
			return this.prisma.visitor
				.findFirst({
					where: {
						uuid: uuid,
						creds: creds,
						finishedAt: {
							gt: new Date()
						}
					}
				})
				.catch(errorsHandler);
		}
		return user;
	}
	async getLibraryCart(profileId: string) {
		return profileId;
	}

	async generateTokensChilds(count: number) {
		const data = await this.prisma
			.$transaction(
				new Array(count).fill(
					this.prisma.readerChildren.create({
						data: {},
						select: { uuid: true }
					})
				)
			)
			.catch(errorsHandler);
		return (data as any).map(child => {
			return {
				token: this.JWTService.sign(
					{ uuid: child.uuid },
					{
						secret: this.configService.get('SECRETKEY'),
						expiresIn: this.configService.get('EXPIRESINCHILD')
					}
				)
			};
		});
	}

	async activateTokenChild(header: string) {
		try {
			const decToken = await this.JWTService.verifyAsync(header, {
				secret: this.configService.get('SECRETKEY')
			});
			const child = await this.getReaderChild(decToken.uuid);
			if (child) {
				const dateEnd = new Date();
				dateEnd.setHours(18);
				dateEnd.setMinutes(0);
				dateEnd.setSeconds(0);
				await this.prisma.readerChildren.update({
					where: {
						uuid: child.uuid
					},
					data: {
						updatedAt: new Date(),
						finishedAt: dateEnd
					}
				});
				return;
			}
		} catch (error) {
			throw new HttpException('Токен не найден', 404);
		}
		throw new HttpException('Токен не найден', 404);
	}

	async getReaderChild(uuid: string) {
		return this.prisma.readerChildren
			.findFirst({
				where: {
					uuid: uuid,
					finishedAt: null
				}
			})
			.catch(errorsHandler);
	}
}
