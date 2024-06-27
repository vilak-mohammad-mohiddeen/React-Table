import { Outlet } from "react-router-dom";
import { HeaderComponent } from "../components/HeaderComponent";


export function RootComponent(){

    return <>
        <HeaderComponent />
        <Outlet />
    </>
}