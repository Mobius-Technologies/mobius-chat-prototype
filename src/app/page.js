import {Button} from '@tremor/react'

export default function Home(){
    return(
        <div>
        <div className="flex place-content-center items-center justify-center h-screen">
            <img src="https://www.arnvgh.me/_next/image?url=%2Fgradient-background-top.png&w=3840&q=100" className="w-screen absolute top-0"/>
            <div className="flex place-content-center items-center justify-center relative">
            <div className="font-bold text-8xl -translate-y-24">Introducing</div>
            <div className="absolute bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-bold text-8xl">Mobius.</div>
            <div className="absolute bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent blur-2xl font-bold text-8xl">Mobius.</div>
            </div>
 
        </div>
        <div style={{height:'25vh'}}></div>

        <div className="font-bold text-6xl -translate-y-24 text-center">Some links you may find helpful:</div>
        <div className="grid gap-1 grid-cols-2 w-fit mx-auto h-96">
        <a href="./demo"><Button>Demo {"-->"}</Button></a>
        <a href="./dashboard"><Button>Dashboard {"-->"}</Button></a>
        </div>
        </div>
    )
}