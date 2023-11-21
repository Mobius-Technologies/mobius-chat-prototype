import { Card, Metric, Text, Title, Button, Subtitle } from "@tremor/react";
import { FaHome } from "react-icons/fa";

export default function Header(){
    return(
        <div className="sticky top-0 p-2 backdrop-blur-sm flex justify-between z-50">
                <Title>Mobius.</Title>
                
                <div className="flex ml-auto w-fit">
                <a href="/dashboard"><Button><FaHome /></Button> </a>
                <div className="dropdown my-auto dropdown-end flex justify-center">
            <button><img src={"https://vercel.com/api/www/avatar/" + "asdfasdf"} className="h-8 w-8 rounded-full mx-2 my-auto"/></button>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 translate-y-10">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
            </div>
            </div>
            </div>
    )
}