import { HttpException, HttpStatus } from '@nestjs/common';

export function errorsHandler(err) {
	if (err.code === 'P2002') {
		throw new HttpException(
			`${err.meta.target} - должен быть уникальным`,
			HttpStatus.BAD_REQUEST
		);
	} else if (err.code === 'P2003') {
		// понаблюдать за этой проверкой !!!
		throw new HttpException(
			`${err.meta.field_name} - есть связанные сущности`,
			HttpStatus.BAD_REQUEST
		);
	} else if (err.code === 'P2025') {
		throw new HttpException(`запись не существует`, HttpStatus.NOT_FOUND);
	}

	if (err.code === 'InvalidRequest') {
		throw new HttpException('Файл не найден', HttpStatus.NOT_FOUND);
	} else if (err.code === 'NotFound') {
		throw new HttpException(
			'Произошла ошибка при загрузке файла',
			HttpStatus.NOT_FOUND
		);
	}

	console.error(err);
	throw new HttpException('Произошла ошибка', HttpStatus.INTERNAL_SERVER_ERROR);
}
