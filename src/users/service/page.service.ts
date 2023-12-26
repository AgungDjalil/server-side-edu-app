import { Order } from "src/enum/order.enum";
import { GenericFilter } from "../dto/generic-filter.dto";
import { FindOptionsWhere, Repository } from "typeorm";

export class PageService {
    protected createOrderQuery(filter: GenericFilter) {
        const order: any = {};

        if (filter.orderBy) {
            order[filter.orderBy] = filter.sortOrder;
            return order;
        }

        order.createdAt = Order.DESC;
        return order;
    }

    protected paginate<T>(
        repository: Repository<T>,
        filter: GenericFilter,
        where: FindOptionsWhere<T>
    ) {
        return repository.findAndCount({
            order: this.createOrderQuery(filter),
            skip: (filter.page - 1) * (filter.pageSize + 1),
            take: filter.pageSize,
            where: where,
        });
    }

}
