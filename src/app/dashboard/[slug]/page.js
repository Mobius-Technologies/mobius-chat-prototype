import { Card, Metric, Text, Title, Button, Subtitle } from "@tremor/react";
import { AreaChart } from "@tremor/react";
import { BarChart } from "@tremor/react";
import Header from "../../../../components/header/header";
import { Flex, BadgeDelta, DeltaType, Grid } from "@tremor/react";


const chartdata = [
    {
        date: "Jan 22",
        "views": 10
    },
    {
        date: "Feb 22",
        "views": 100,
    },
    {
        date: "Mar 22",
        "views": 3322,
    },
    {
        date: "Apr 22",
        "views": 30304,
    },
    {
        date: "May 22",
        "views": 60600,
    },
    {
        date: "Jun 22",
        "views": 70000
    },
];

const chartdata2 = [
    {
        name: "USA",
        "views": 2488,
    },
    {
        name: "Mexico",
        "views": 1445,
    },
    {
        name: "Canada",
        "views": 743,
    },
    {
        name: "UK",
        "views": 281,
    },
    {
        name: "Australia",
        "views": 251,
    }
];


const categories = [
    {
      title: "Sales",
      metric: "$ 12,699",
      metricPrev: "$ 9,456",
      delta: "34.3%",
      deltaType: "moderateIncrease",
    },
    {
      title: "Profit",
      metric: "$ 40,598",
      metricPrev: "$ 45,564",
      delta: "10.9%",
      deltaType: "moderateDecrease",
    },
    {
      title: "Customers",
      metric: "1,072",
      metricPrev: "856",
      delta: "25.3%",
      deltaType: "moderateIncrease",
    },
  ];

const valueFormatter = (number) => {
    return "$ " + new Intl.NumberFormat("us").format(number).toString();
};


export default function Home({params}) {
    return (
        <div>
            <Header />

        <div className="w-[800px] mx-auto max-w-full p-2">
 
            <Title className="font-bold">{params.slug}</Title>
            


            <Card className="my-2">
                <Title>Views</Title>
                <AreaChart
                    className="h-72 mt-4"
                    data={chartdata}
                    index="date"
                    categories={["views"]}
                    colors={["indigo"]}
                />

            </Card>
            <Card className="my-2">
                <Title>Views by location</Title>
                <Subtitle>
                    This past month.
                </Subtitle>
                <BarChart
                    className="mt-6"
                    data={chartdata2}
                    index="name"
                    categories={["views"]}
                    colors={["blue"]}
                    yAxisWidth={48}
                />
            </Card>
        </div>
        </div>
    )
}