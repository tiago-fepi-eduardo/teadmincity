export class ContactModel {
    id!: number;
    subject!: string;
    message!: string;
    email!: string;
    createdAt!:string;
    closed!:boolean;
    callbackSuccess!: boolean;
    callbackMessage!: string;
}
