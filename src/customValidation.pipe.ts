import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Type,
  Logger,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  private readonly logger = new Logger(CustomValidationPipe.name);
  private instanceLevel: string;

  constructor(private level: string) {
    this.instanceLevel = level;
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    this.logger.debug(
      `CustomValidationPipe ${this.instanceLevel} -- Validating`,
    );
    // this.logger.debug(value, metatype);

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    // console.log({ object, errors: JSON.stringify(errors, null, 2) });
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Type<any> | undefined): boolean {
    const types: any = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
