import { BaseContainer } from "@/components/_core/base-container";
import { StatusSwitch } from "@/components/_core/status-switch";
import { useProperty } from "@/hooks/property.hook";
import { IProperty, WithId } from "@bitmetro/identity";
import { Alert, Box, CssBaseline, ThemeProvider, Typography, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  getTitle: (property: WithId<IProperty>) => string;
  children: (property: WithId<IProperty>) => React.ReactNode;
}

export const PropertyContainer: React.FC<Props> = ({ getTitle, children }) => {
  const router = useRouter();
  const propertyId = router.query.propertyId as string;

  const [getPropertyStatus, property] = useProperty(propertyId);

  const theme = React.useMemo(() => createTheme({
    palette: {
      mode: property?.formTheme || "light",
      background: property?.formTheme === "light"
        ? {
          default: grey[300]
        }
        : {}
    }
  }), [property?._id]);

  if (!propertyId) {
    return (
      <BaseContainer>
        <Alert severity="error">
          No property ID provided
        </Alert>
      </BaseContainer>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <BaseContainer>
        <StatusSwitch
          status={getPropertyStatus}
        >
          {property && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                {property.logo && (
                  <img
                    src={property.logo}
                    alt={`${property.name} logo`}
                    width={64}
                    height={64}
                  />
                )}

                <Typography variant="h5" sx={{ ml: 2 }}>{getTitle(property)}</Typography>
              </Box>

              {children(property)}
            </>
          )}
        </StatusSwitch>
      </BaseContainer>
    </ThemeProvider>
  )
}
