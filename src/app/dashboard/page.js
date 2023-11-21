"use client"

import { Card, Metric, Text, Title, Button, Subtitle, SparkAreaChart } from "@tremor/react";
import { FaChevronDown, FaHome } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { TextInput } from "@tremor/react";

import { FaPlus } from "react-icons/fa";
import Header from "../../../components/header/header";

import { FaListUl } from "react-icons/fa";
import { IoListOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsChevronDown } from "react-icons/bs";
import { useState } from "react";
import { Grid } from "@tremor/react";



const FakeCard = ({listView}) => {
  return (
    <Card className={`grow ${listView == false? '' : ''} hover:shadow-md transition-all duration-250`}>
      <div className="flex">
        <a href="./dashboard/project-1" className="w-full">
          <div>

            <Title>Project 1</Title>
            <Subtitle>Description...</Subtitle>

          </div>
        </a>
        <div>
        </div>
        <div className="dropdown ml-auto my-auto dropdown-end">
          <button className="text-2xl text-center">...</button>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>

    </Card>

  )
}



export default function Home() {
  const [listView, setListView] = useState(true)
  return (
    <div>
      <Header />

      <div className="w-[800px] mx-auto max-w-full p-2">
        <div className="flex">
          <TextInput className="" placeholder="Search..." />
          
          <div className="shadow-md flex w-fit rounded-md ml-2">
          <div className={`w-8 h-8 flex rounded-md place-items-center justify-between items-center m-auto ml-1 cursor-pointer ${listView == false? 'bg-slate-200' : ''}`}
          onClick={()=>setListView(false)}
          >
          <svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" className={`transition-all mx-auto ${listView == true ? 'opacity-75 hover:opacity-100' : ''}`}><path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5.5V2.5H5.5V5.5H2.5ZM1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7H2C1.44772 7 1 6.55228 1 6V2ZM2.5 13.5V10.5H5.5V13.5H2.5ZM1 10C1 9.44772 1.44772 9 2 9H6C6.55228 9 7 9.44772 7 10V14C7 14.5523 6.55228 15 6 15H2C1.44772 15 1 14.5523 1 14V10ZM10.5 2.5V5.5H13.5V2.5H10.5ZM10 1C9.44772 1 9 1.44772 9 2V6C9 6.55228 9.44772 7 10 7H14C14.5523 7 15 6.55228 15 6V2C15 1.44772 14.5523 1 14 1H10ZM10.5 13.5V10.5H13.5V13.5H10.5ZM9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10V14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14V10Z" fill="currentColor" className="mx-auto"></path></svg>
          </div>
          <div className={`w-8 h-8 flex rounded-md place-items-center justify-between items-center m-auto mr-1 cursor-pointer ${listView == true? "bg-slate-200" : ''}`}
          onClick={()=>setListView(true)}>
          <FaListUl className={`transition-all mx-auto ${listView == false ? 'opacity-75 hover:opacity-100' : ''}`} />
          </div>
          </div>

          <div className="dropdown ml-auto my-auto dropdown-end flex justify-center">
            <Button className="!flex items-center place-content-center justify-center h-10 ml-2 rounded-full group"><span className="flex">Add New...<BsChevronDown className="h-full m-auto ml-4" /></span></Button>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 translate-y-10">
              <li><a>Smaller thing</a></li>
              <li><a>Larger thing</a></li>
            </ul>
          </div>

        </div>


        <Grid className={`gap-2 mt-2 ${listView == false? "card-holder mt-4" : ""}`}>
        <FakeCard listView={listView} />
        <FakeCard listView={listView} />
        <FakeCard listView={listView} />
        </Grid>


      </div>
    </div>
  )
}