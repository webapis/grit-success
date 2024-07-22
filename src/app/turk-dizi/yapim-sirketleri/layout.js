
import PersistentDrawerLeft from "@/app/components/drawer"
import { NavData } from "./page"
export default function({children}){
    return <PersistentDrawerLeft  data={NavData} title="Yapım Şirketleri">{children}</PersistentDrawerLeft>
}