import { Card, Metric, Text, Title, Button, Subtitle } from "@tremor/react";
import { FaHome } from "react-icons/fa";
import { supabase } from "../../src/app/supabase/initiate"
import { useRouter } from 'next/navigation'



export default function Header({username, breadcrumbs}){

    const router = useRouter()

    async function leave(){
        let { error } = await supabase.auth.signOut()
        router.push('/')
        console.log('exit')
    }
    return(
        <div className="sticky top-0 p-2 backdrop-blur-sm flex justify-between z-50">
                <div className="relative">
                <Title className="absolute bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent font-bold">Mobius.</Title>
                <Title className="absolute bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent blur-md font-bold">Mobius.</Title>
                </div>
                
                <div className="flex ml-auto w-fit breadcrumbs">
                    <ul>
                    {breadcrumbs.map((crumb, i)=>{
                        return <li key={crumb.name + i}><a href={crumb.href}>{crumb.name}</a></li>
                    })}
                    </ul>
                
                
            </div>
           
            <div className="dropdown dropdown-end my-auto">
            <div tabIndex={0} role="button" className=""><img src={`https://avatar.vercel.sh/${username.split('.')[0]}.svg?text=${username[0]}`} className="h-8 w-8 rounded-full mx-2 my-auto"/></div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={()=>{leave()}}>Logout</a></li>
                <li className="text-red-500 focus:!bg-red-500"><a>Delete Account</a></li>
            </ul>
            </div>
            </div>
    )
}