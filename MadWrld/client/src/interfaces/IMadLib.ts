import ITemplate from "./ITemplate";
import IUser from "./IUser";

interface IMadLib {
    id: number;
    templateId: number;
    userProfileId: number;
    template: ITemplate;
    userProfile: IUser;
    inputs: string;
    story: string;
}

export default IMadLib;