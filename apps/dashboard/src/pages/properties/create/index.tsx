import { PropertyCreateForm } from "@/components/properties/property.create";
import { NextPage } from "next";

const PropertyCreatePage: NextPage = () => {
  return <PropertyCreateForm />;
}

PropertyCreatePage.getInitialProps = () => ({});

export default PropertyCreatePage;
