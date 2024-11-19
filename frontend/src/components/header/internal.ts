import { User } from "../../public/user";
import { Path } from "../../routing/path";
import { NavigateFunction } from "react-router-dom";

export namespace internal {
    export enum HeaderItemType {
        forAll,
        onlyForAnonymous,
        onlyForAuth,
    }

    interface HeaderContext {
        user: User;
        navigate: NavigateFunction;
    }

    export interface HeaderItem {
        name: string;
        type: HeaderItemType;
        onClick?: (context: HeaderContext) => void;
    }

    export interface HeaderLinkItem extends HeaderItem {
        path?: Path;
    }

    export function filterByType<T extends HeaderItem>(
        items: T[],
        isAuth: boolean,
    ): T[] {
        return items.filter((item) => {
            return !(
                (item.type === HeaderItemType.onlyForAuth && !isAuth) ||
                (item.type === HeaderItemType.onlyForAnonymous && isAuth)
            );
        });
    }
}
