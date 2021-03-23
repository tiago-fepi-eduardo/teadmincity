import { OcorrencyModel } from '../_models/ocorrency-model';
import { OcorrencyDetailModel } from '../_models/ocorrency-detail-model';
import { OrderStatusModel } from '../_models/order-status-model';

export class OrderModel {
    id!: number;
    longitude!: string;
    latitude!: string;
    ocorrency!: OcorrencyModel;
    ocorrencyDetail!: OcorrencyDetailModel;
    orderStatus!: OrderStatusModel;
    createdAt!: string;

    ocorrencyId!: number;
    ocorrencyDetailId!: number;
    orderStatusId!: number;

    totalItems: number;
    totalPage: number;
    page: number;
    callbackSuccess!: boolean;
    callbackMessage!: string;
}
