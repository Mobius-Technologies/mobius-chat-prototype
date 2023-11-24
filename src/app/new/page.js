"use client"

import Header from "../../../components/header/header"
import {Card, Grid, Title} from '@tremor/react'
import { AnimatePresence, motion, useAnimation, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState } from "react";

export default function Home(){
    const controls = useAnimation();
    const controls2 = useAnimation();
    const icon = useAnimation();
    const [select, setSelect] = useState(0)
    const [select2, setSelect2] = useState(0)

    const animate = ()=>{
        setSelect(Math.abs(select-1))
        controls.start({ width: select ? 64 : 164 });
        controls.start({ height: select ? 64 :  256});
        controls.start({ marginTop: select ? 64 : 0 });    
      }

      const otherAnimate = () =>{
        setSelect2(Math.abs(select2-1))
        icon.start({opacity: select2? 1 : 0})

        controls2.start({scale: select2? .9 : 1})
        controls2.start({maxWidth: 700})
        controls2.start({opacity: select2 ? 0:1})
      }
    return(
        <div>
            <Header breadcrumbs={[
                {name:"home",
                href: "/dashboard"
            },
            {name:"create",
                href: "/new"
            }
            ]} />
            <div className="w-[800px] mx-auto max-w-full p-2">
                <Title>Template</Title>
                <Grid className="gap-2 card-holder relative">
                    <Card className="hover:border-blue-500"><motion.div className="w-16 h-16 bg-gradient-to-br from-cyan-800/10 to-purple-100 backdrop-blur-sm rounded-md cursor-pointer ml-auto mt-auto mb-0"
    animate={controls}
    onClick={()=>animate()}
    transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
    }}
   ></motion.div></Card>
                    <Card className="relative flex justify-center items-center place-content-center">
                    <motion.div className='absolute z-50 w-32 bg-gradient-to-br from-cyan-800/10 to-purple-100 h-8 rounded-full cursor-pointer group px-4 transition-all hover:scale-110 flex justify-center items-center place-content-center right-4 bottom-4' onClick={()=>otherAnimate()}
  animate={icon}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }}
  ></motion.div>
  <motion.div className="cursor-pointer bg-gradient-to-br from-cyan-800/10 to-purple-100 backdrop-blur-sm rounded-md flex flex-col items-end justify-end w-full h-32"
   animate={controls2}
   initial={{opacity:0, scale:0.9}}
   transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }}
  onClick={()=>otherAnimate()}
   ></motion.div>
                    </Card>
                </Grid>
                <br />

                <Title>Train our model</Title>
                <Grid className="gap-2 card-holder">
                    <Card></Card>
                    <Card></Card>
                </Grid>
            </div>
        </div>
    )
}