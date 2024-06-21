import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus } from "../enum/order.enum";

export class StatusDto{
    @IsOptional()
    @IsEnum(OrderStatus, {
        message: `status must be a valid enum value: ${Object.values(OrderStatus)}`
    })
    status:OrderStatus
}