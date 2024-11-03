import { Path } from "../../routing/path";

export enum HeaderElemType {
    forAll,
    onlyForAnonymous,
    onylForAuth,
}

export interface HeaderListElem {
    name: string;
    path: Path;
    type: HeaderElemType;
    related?: string[];
}
