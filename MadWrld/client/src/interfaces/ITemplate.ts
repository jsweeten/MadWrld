import IUser from "./IUser";
import IAnswerTemplate from "./IAnswerTemplate";
import ICategory from "./ICategory";

export default interface ITemplate extends ITemplateTitle {
    id: number;
    user: IUser;
    answerTemplates: IAnswerTemplate[];
    categories: ICategory[];
}

export interface ITemplateTitle {
    userId: number;
    title: string;
}