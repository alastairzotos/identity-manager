import { IUserDetail } from "../schemas";

const userDetailsMap: Record<IUserDetail, string> = {
  display_name: 'name',
  first_name: 'given_name',
  last_name: 'family_name'
}

export const userDetailsToGoogleFields = (userDetails: IUserDetail[]) =>
  userDetails.map(detail => userDetailsMap[detail]).join(',');

export const googleFieldsToUserDetails = (info: any): Partial<Record<IUserDetail, string>> => {
  return {
    display_name: info.name,
    first_name: info.given_name,
    last_name: info.family_name,
  }
}
