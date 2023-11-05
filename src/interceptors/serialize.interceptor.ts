import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass, ClassConstructor } from "class-transformer";
import { Observable, map } from "rxjs";

export default function Serialize(dto: ClassConstructor<object>) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassConstructor<object>) {}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((value) => {
                return plainToClass(this.dto, value, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}