import { IRoute } from "umi";

export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};
  return {
    /**
     * 'admin', 'Account Admin', 'Merchant Operator', 'Finance Operator', 'Risk Operator', 'Merchant Checker', 'Finance Checker'
     * 'Account Admin' : ssp用户管理
     * 
     */
    canShow: (route: IRoute) => route.roles
      .map((role: string) => currentUser?.roles.includes(role))
      .reduce((a: boolean, b: boolean) => a || b, false),
  };
}
