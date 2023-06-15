import { PropertiesList } from "@/components/properties/properties.list";
import { NextPage } from "next";

const PropertiesPage: NextPage = () => {
  return <PropertiesList />;
}

PropertiesPage.getInitialProps = () => ({});

export default PropertiesPage;
