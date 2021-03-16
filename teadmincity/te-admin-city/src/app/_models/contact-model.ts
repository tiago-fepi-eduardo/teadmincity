export class ContactModel {
    id!: number;
    subject!: string;
    message!: string;
    email!: string;
    createdAt!:string;
    closed!:boolean;
    totalItems: number;
    totalPage: number;
    page: number;
    callbackSuccess!: boolean;
    callbackMessage!: string;
}
