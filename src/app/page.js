"use client"

import {Button} from '@tremor/react'
import { useRef, useEffect, useState } from 'react'
import {motion, useAnimation} from 'framer-motion'

export default function Home(){
    const iframe = useAnimation();
    const scrollAmount = useRef(null)
    const [scrollHeight, setScrollHeight] = useState(0)


    const handleScroll = () => {
        const position = window.scrollY;
        console.log(window.scrollY)
        setScrollHeight(position);
      };


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    
        const position = window.scrollY
        setScrollHeight(position)
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
        
      }, []);


    return(
        <div ref={scrollAmount}>
        <div className="flex place-content-center items-center justify-center h-screen overflow-hidden">
            <img src="https://www.arnvgh.me/_next/image?url=%2Fgradient-background-top.png&w=3840&q=100" className="w-screen absolute top-0 -z-20"/>
            <div className="flex place-content-center items-center justify-center relative mx-auto z-20">
            <div className="font-bold text-8xl -translate-y-24">Introducing</div>
            <div className="absolute bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-bold text-8xl">Mobius.</div>
            <div className="absolute bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent blur-2xl font-bold text-8xl">Mobius.</div>
            </div>
            <iframe src="./demo" className={`transition-all duration-500 ease-out fixed rounded-md xl:bg-base-200 mx-auto origin-top overflow-visible backdrop-blur will-change-auto ${scrollHeight < 200 || scrollHeight > 950 ? 'scale-75 -z-10' : 'scale-100 z-10'} ${scrollHeight>950 ? 'opacity-0' : 'opacity-100'} [--rtl-reverse:1] [${scrollHeight < 200 ? 'transform:rotateX(20deg)rotateZ(-20deg)skewY(8deg)scale(1)' : ''}] rtl:[--rtl-reverse:-1] rtl:[${scrollHeight < 200 ? 'transform:rotateX(20deg)rotateZ(20deg)skewY(-8deg)scale(1)' : ''}] max-[1280px]:![transform:translate3d(0,0,0)] xl:h-[32rem] xl:w-[50rem] xl:rounded-e-none xl:shadow-md xl:backdrop-blur-0`}/>
        </div>
        <div style={{height:'100vh'}}></div>

        <div className="z-30">
        <div className="font-bold text-6xl -translate-y-24 text-center z-30">Some links you may find helpful:</div>
        <div className="grid gap-1 grid-cols-2 w-fit mx-auto h-96">
        <a href="./demo"><Button>Demo {"-->"}</Button></a>
        <a href="./dashboard"><Button>Dashboard {"-->"}</Button></a>
        </div>
        </div>
        </div>
    )
}