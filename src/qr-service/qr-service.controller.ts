import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Header,
	Headers
} from '@nestjs/common';
import { QrServiceService } from './qr-service.service';
import { CreateQrServiceDto } from './dto/create-qr-service.dto';
import { UpdateQrServiceDto } from './dto/update-qr-service.dto';

@Controller('v1/qr-code')
export class QrServiceController {
	constructor(private readonly qrServiceService: QrServiceService) {}

	@Post()
	createToken(@Headers('Authorization') header: string) {
		return this.qrServiceService.createToken(header);
	}

	@Post('child')
	createTokenChildren(@Headers('Count') header: string) {
		return this.qrServiceService.generateTokensChilds(+header);
	}

	@Get()
	verificationToken(@Headers('QR-Code') header: string) {
		return this.qrServiceService.verificationToken(header);
	}

	@Get('child')
	activateTokenChild(@Headers('QR-Code') header: string) {
		return this.qrServiceService.activateTokenChild(header);
	}
}
