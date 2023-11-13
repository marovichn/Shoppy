"use client";

import { FC, useEffect, useState } from "react";
import Heading from "@/components/Heading";
import { Separator } from "@/components/ui/separator";
import { UsersDataTable } from "./UsersDataTable";
import { UsersColumn, columns } from "./UsersColumns";
import PieChartGender from "./UsersChart";
import PieChartAge from "./UsersChartAge";
interface UsersClientProps {
  data: UsersColumn[];
}

const UsersClient: FC<UsersClientProps> = ({ data }) => {
  const [genderData, setGenderData] = useState({
    males: 0,
    females: 0,
    other: 0,
  });
  const [ageData, setAgeData] = useState({
    youngs: 0,
    youngAdults: 0,
    adults: 0,
    oldies: 0,
  });

  useEffect(() => {
    const males = data.filter((item) => item.gender === "Male");
    const females = data.filter((item) => item.gender === "Female");
    const others = data.filter((item) => item.gender === "Other");
    const youngs = data.filter(
      (item) => Number(item.age) >= 18 && Number(item.age) < 25
    );
    const youngAdults = data.filter(
      (item) => Number(item.age) >= 25 && Number(item.age) < 40
    );
    const adults = data.filter(
      (item) => Number(item.age) >= 40 && Number(item.age) < 60
    );
    const oldies = data.filter((item) => Number(item.age) >= 60);

    setGenderData({
      males: males.length,
      females: females.length,
      other: others.length,
    });
    setAgeData({
      youngs: youngs.length,
      youngAdults: youngAdults.length,
      adults: adults.length,
      oldies: oldies.length,
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
      <div className='flex items-center justify-center flex-col gap-5'>
        <div className='flex flex-col items-start justify-center gap-5 w-full'>
          <PieChartGender
            data={[
              { name: "Males", value: genderData.males, index: 0 },
              { name: "Females", value: genderData.females, index: 1 },
              { name: "Other", value: genderData.other, index: 2 },
            ]}
          />
        </div>
        <div className='flex flex-col items-start justify-center gap-5 w-full' >
          <PieChartAge
            data={[
              { name: "18-25", value: ageData.youngs, index: 0 },
              { name: "25-40", value: ageData.youngAdults, index: 1 },
              { name: "40-60", value: ageData.adults, index: 2 },
              { name: ">60", value: ageData.oldies, index: 3 },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default UsersClient;
