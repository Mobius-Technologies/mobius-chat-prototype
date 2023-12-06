"use client"

import { useState } from "react"
import { supabase } from "../supabase/initiate"
import { TextInput } from "@tremor/react";
import { Button, Card, Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels
} from "@tremor/react";
import { useRouter } from 'next/navigation'



export default function Home(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let router = useRouter()


    const addUser = async ()=>{
        let {data, error} = await supabase.auth.signUp({
            email: username,
            password: password
        })
        if(error){
            alert(error.message)
        }

        if(data && !error){
            router.push('/confirm')
            console.log('rediirect')
        }

    }

    const login = async ()=>{
        let {data, error} = await supabase.auth.signInWithPassword({
            email: username,
            password: password
        })
        if(error){
            alert(error.message)
        }

        if(data && !error){
            router.push('/dashboard')
            console.log('rediirect')
        }

    }

    return(
        <div>
        <Card className="max-w-sm">
            <TabGroup>
            <TabList className="mt-8">
            <Tab>Sign Up</Tab>
            <Tab>Sign In</Tab>
            </TabList>

            <TabPanels>
                <TabPanel className="space-2">

            <TextInput value={username} onChange={(event)=>setUsername(event.target.value)} className="my-1" />
            <TextInput value={password} onChange={(event)=>setPassword(event.target.value)} className="my-1"/>
            
            <Button onClick={()=>addUser()} className="my-1 ml-auto mr-0">Sign Up</Button>
            </TabPanel>

            <TabPanel>

<TextInput value={username} onChange={(event)=>setUsername(event.target.value)} className="my-1"/>
<TextInput value={password} onChange={(event)=>setPassword(event.target.value)} className="my-1"/>

<Button onClick={()=>login()}className="my-1 ml-auto mr-0">Sign In</Button>
</TabPanel>

            </TabPanels>


            </TabGroup>
        </Card>
        </div>
    )
}