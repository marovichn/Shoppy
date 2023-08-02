"use client";

import { useOrigin } from "@/hooks/use/use-origin";
import { useParams } from "next/navigation";
import { FC } from "react";
import ApiAlert from "./ApiAlert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}

const ApiList: FC<ApiListProps> = ({ entityName, entityIdName }) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <ApiAlert title='GET' variant='public' description={`${baseUrl}/${entityName}`}/>
    </>
  );
};

export default ApiList;
