import { getProperty } from "@/clients/property.client";
import { createQuery } from "@bitmetro/create-query";

export const useGetProperty = createQuery(getProperty);
