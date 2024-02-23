import ITemplate from "./ITemplate";

interface ICategory {
    id: number;
    name: string;
    templates?: ITemplate[];
}

export default ICategory;