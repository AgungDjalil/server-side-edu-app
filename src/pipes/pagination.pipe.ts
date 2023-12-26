import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log({value, metadata})
    // const { type } = metadata;

    // if (type !== 'query') {
    //   // Hanya terapkan pagination pada parameter query
    //   return value;
    // }

    // const { page, take } = value;

    // if (!page || !take) {
    //   throw new BadRequestException('Invalid pagination parameters. Both page and take are required.');
    // }

    // const transformedValue = {
    //   page: parseInt(page, 10),
    //   take: parseInt(take, 10),
    // };

    // if (isNaN(transformedValue.page) || isNaN(transformedValue.take) || transformedValue.page < 1 || transformedValue.take < 1) {
    //   throw new BadRequestException('Invalid pagination parameters. Page and take must be positive integers.');
    // }

    // return transformedValue;
  }
}