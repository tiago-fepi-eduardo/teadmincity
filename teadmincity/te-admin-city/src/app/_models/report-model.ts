import { OrderModel } from '../_models/order-model';

export class ReportModel {

    numberOcorrencyXtype: Map<string, number>;

    numberOcorrencyXday: Map<string, number>;
    
    numberOcorrencyXstatusXday: Map<string, Map<string, number>>;

    lastIncomes: OrderModel[];

    lastUpdates: OrderModel[];
}
