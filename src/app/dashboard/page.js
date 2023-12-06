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
import { useEffect, useState } from "react";
import { Grid } from "@tremor/react";
import { DashboardIcon, ListBulletIcon, ChevronDownIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'

import { supabase } from "../supabase/initiate";

const FakeCard = ({ listView, project, description }) => {
  return (
    <motion.div layout="position">
    <Card className={`w-full ${listView == false ? '' : ''} hover:shadow-md transition-all duration-250`}>
      <div className="flex">
        <a href="./dashboard/project-1" className="w-full">
          <div>

            <Title>{project}</Title>
            <Subtitle>{description}</Subtitle>

          </div>
        </a>
        <div>
        </div>
        <div className="dropdown ml-auto my-auto dropdown-end">
          <button className="text-2xl text-center align-middle">...</button>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>
      </div>

    </Card>
    </motion.div>

  )
}


export default function Home() {

  const [user, setUser] = useState({})
  console.log(user.email)
  
useEffect(()=>{
  async function getUser(){
    const { data: { user } } = await supabase.auth.getUser()
    console.log('-----')
    console.log(user)
    setUser(user)
  }

  getUser()
}, [])

  const [listView, setListView] = useState(true)
  return (
    <div className="overflow-x-hidden">
      <Header username={user && user.email ? user.email : ''} breadcrumbs={[
        {name: "home",
      href: '/dashboard'}
      ]}/>

      <div className="w-[800px] mx-auto max-w-full p-2">
        <div className="flex">
          <TextInput className="" placeholder="Search..." />

          <Card className="flex w-fit rounded-md ml-2 p-0">

            <div className="relative w-10 h-10 cursor-pointer">
              <motion.div className={`absolute w-8 h-8 flex rounded-md place-items-center justify-between items-center m-auto ml-1 cursor-pointer`}
                onClick={() => setListView(false)}
              >
                <DashboardIcon className={`z-50 absolute transition-all mx-auto ml-2 mt-2 ${listView == true ? 'opacity-75 hover:opacity-100' : ''}`} />
              </motion.div>
              {listView != true ? (
                <motion.div className="absolute bg-slate-200 w-8 h-8 m-auto top-1 left-1 rounded-md" layoutId="listView"></motion.div>
              ) : null}
            </div>

            <motion.div className="relative w-10 h-10 cursor-pointer">
              <motion.div className={`absolute w-8 h-8 flex rounded-md place-items-center justify-between items-center m-auto mr-1 cursor-pointer}`}
                onClick={() => setListView(true)}>
                <ListBulletIcon className={`z-50 transition-all mx-auto ml-3 mt-2 ${listView == false ? 'opacity-75 hover:opacity-100' : ''}`} />

              </motion.div>
              {listView == true ? (
                <motion.div className="absolute bg-slate-200 w-8 h-8 m-auto top-1 left-1 rounded-md" layoutId="listView"></motion.div>
              ) : null}
            </motion.div>
          </Card>

          <div className="dropdown ml-auto my-auto dropdown-end flex justify-center">
            <Button className="!flex items-center place-content-center justify-center h-10 ml-2 rounded-full group"><span className="flex">Add New...<ChevronDownIcon className="h-full m-auto ml-4" /></span></Button>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 translate-y-10">
              <li><a href="/new">Project</a></li>
            </ul>
          </div>

        </div>


        <Grid className={`gap-2 h-fit overflow-y-clip py-2 ${listView == false ? "card-holder" : ""}`}>
          <FakeCard listView={listView} project={"Project 1"} description={"multi-function chatbot"} />
        </Grid>

      </div>
    </div>
  )
}