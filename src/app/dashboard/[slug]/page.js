"use client"

import { Card, Metric, Text, Title, Button, Subtitle } from "@tremor/react";
import { AreaChart } from "@tremor/react";
import { BarChart } from "@tremor/react";
import Header from "../../../../components/header/header";
import { Flex, BadgeDelta, DeltaType, Grid } from "@tremor/react";
import { useState, useEffect } from "react";
import fetchImg from "../../../../components/fetchImg";
import {motion} from 'framer-motion'
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

function encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}


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

    

    const [imageUrl, setImageUrl] = useState('');

    const captureScreenshot = async () => {
        const response = await fetch(`/api/img/?url=https://youtube.com`, {method: "POST"});
        const data = await response.json(); // Assuming the response is JSON containing the Base64 string

        // Convert Base64 string to Blob
        const base64Image = data.image; // Assuming 'image' is the key holding the Base64 string
        const byteCharacters = atob(base64Image);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' }); // Replace 'image/png' with the correct MIME type

        // Create an object URL and set it
        const objectURL = URL.createObjectURL(blob);
        console.log(objectURL);
        console.log(blob);
        setImageUrl(objectURL);

    };

    useEffect(()=>{
        captureScreenshot()
    }, [])

    return (
        <div>
            <Header breadcrumbs={[
        {name: "home",
      href: '/dashboard'},
      {name: 'project',
    href: '/dashboard/' + params.slug}
      ]}/>

        <div className="w-[800px] mx-auto max-w-full p-2">
 
            <Title className="font-bold">{params.slug}</Title>
            <Card className="my-2">
                {imageUrl && 
                <motion.img src={imageUrl} className="rounded-md" />
                }
                {!imageUrl && 
                <motion.div className="animate-pulse rounded-md w-full bg-slate-200" style={{aspectRatio: 4/3}} ></motion.div>
                }
            </Card>
            

            <div className="card-holder">
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
        </div>
    )
}