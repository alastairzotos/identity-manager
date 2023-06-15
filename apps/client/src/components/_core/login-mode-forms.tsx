import { ILoginMode, IProperty } from "@bitmetro/identity";
import { Box } from "@mui/material";

interface Props {
  property: IProperty;
  modeMap: Record<ILoginMode, React.ReactNode>;
}

export const LoginModesForms: React.FC<Props> = ({ property, modeMap }) => {
  return (
    <>
      {property.loginModes.map((mode, index) => (
        <Box key={index} sx={{ mt: 2 }}>
          {modeMap[mode]}
        </Box>
      ))}
    </>
  )
}
