import { IUserDetail } from "../schemas";

const userDetailsMap: Record<IUserDetail, string> = {
  display_name: 'name',
  first_name: 'first_name',
  last_name: 'last_name'
}

export const userDetailsToFacebookFields = (userDetails: IUserDetail[]) =>
  "email," + userDetails.map(detail => userDetailsMap[detail]).join(',');

export const facebookFieldsToUserDetails = (info: any): Partial<Record<IUserDetail, string>> => {
  return {
    display_name: info.name,
    first_name: info.first_name,
    last_name: info.last_name,
  }
}
