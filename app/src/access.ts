import { IRoute } from "umi";

export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canShow: (route: IRoute) => route.roles
      .map((role: string) => currentUser?.roles.includes(role))
      .reduce((a: boolean, b: boolean) => a || b, false),
  };
}
