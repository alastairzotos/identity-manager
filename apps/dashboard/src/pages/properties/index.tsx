import { PropertyList } from "@/components/properties/property.list";
import { NextPage } from "next";

const PropertiesPage: NextPage = () => {
  return <PropertyList />;
}

PropertiesPage.getInitialProps = () => ({});

export default PropertiesPage;
