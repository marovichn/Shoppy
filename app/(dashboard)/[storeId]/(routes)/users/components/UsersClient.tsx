"use client";

import { FC, useEffect, useState } from "react";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { UsersDataTable } from "./UsersDataTable";
import { UsersColumn, columns } from "./UsersColumns";
import PieChartGender from "./UsersChart";

interface UsersClientProps {
  data: UsersColumn[];
}

const UsersClient: FC<UsersClientProps> = ({ data }) => {
  const [genderData, setGenderData] = useState({
    males: 0,
    females: 0,
    other: 0,
  });

  useEffect(() => {
    const males = data.filter((item) => item.gender === "Male");
    const females = data.filter((item) => item.gender === "Female");
    const others = data.filter((item) => item.gender === "Other");
    setGenderData({
      males: males.length,
      females: females.length,
      other: others.length,
    });
  }, [data]);

  return (
    <>
      <Heading
        description='Users data in your store'
        title={`Users (${data.length})`}
      />
      <Separator />
      <UsersDataTable searchKey='products' columns={columns} data={data} />
      <PieChartGender
        data={[
          { name: "Males", value: genderData.males, index: 0 },
          { name: "Females", value: genderData.females, index: 1 },
          { name: "Other", value: genderData.other, index: 2 },
        ]}
      />
    </>
  );
};

export default UsersClient;
