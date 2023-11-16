import { motion } from "framer-motion"

export default function Text({message}){
    return(
        <motion.div initial={{ opacity: 0, y: 50, filter: "saturate(0%)" }} animate={{ opacity: 1, y: 0, filter: "saturate(100%)" }} transition={{ type: "spring",stiffness: 260,
    damping: 20 }} className={`m-2 p-2 bg-gradient-to-br rounded-lg w-fit ${message.type == "question" ? 'ml-auto mr-0 from-white to-gray-100 text-black': 'from-gray-700 to-gray-900 text-white'}`}>{message.text}</motion.div>
    )
}