import { ILoginMode, IProperty } from "@bitmetro/identity";
import { Box } from "@mui/material";

interface Props {
  property: IProperty;
  modeMap: Record<ILoginMode, React.ReactNode>;
}

const sortOrder: ILoginMode[] = ['google', 'facebook', 'email_and_password'];

export const LoginModesForms: React.FC<Props> = ({ property, modeMap }) => {
  return (
    <>
      {sortOrder.filter(mode => property.loginModes.includes(mode)).map((mode, index) => (
        <Box key={index} sx={{ mt: 2 }}>
          {modeMap[mode]}
        </Box>
      ))}
    </>
  )
}
