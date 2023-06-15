import { PropertyManage } from "@/components/properties/property.manage";
import { NextPage } from "next";
import { useRouter } from "next/router";

const PropertyEditPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.propertyId as string;

  return <PropertyManage propertyId={id} />;
}

PropertyEditPage.getInitialProps = () => ({});

export default PropertyEditPage;
