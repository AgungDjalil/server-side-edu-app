import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { Order } from "src/enum/order.enum";

function toNumber(value: any, options: { default: number, min?: number }): number {
    let result = parseFloat(value);
    result = isNaN(result) ? options.default : result;
    if (options.min !== undefined) {
        result = Math.max(result, options.min);
    }
    return result;
}

export class GenericFilter {
    @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
    @IsNumber({}, { message: ' "page" atrribute should be a number' })
    public page: number;

    @Transform(({ value }) => toNumber(value, { default: 10, min: 1 }))
    @IsNumber({}, { message: ' "pageSize" attribute should be a number ' })
    public pageSize: number;

    @IsOptional()
    public orderBy?: string;

    @IsEnum(Order)
    @IsOptional()
    public sortOrder?: Order = Order.DESC;
}