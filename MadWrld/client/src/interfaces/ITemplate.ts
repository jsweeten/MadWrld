import IUser from "./IUser";
import IAnswerTemplate from "./IAnswerTemplate";
import ICategory from "./ICategory";

export default interface ITemplate {
    id?: number;
    title: string;
    user?: IUser;
    userId?: number;
    answerTemplates?: IAnswerTemplate[];
    categories?: ICategory[];
}