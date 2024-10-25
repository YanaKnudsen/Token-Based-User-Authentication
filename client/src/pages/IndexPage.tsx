import Woman from "../assets/woman.png";
import ThinLine from "../components/ThinLine.tsx";
import Header from "../components/Header.tsx";
import { observer } from "mobx-react";
import store from "../mobx/AppDataStore.ts";
import LoginPage from "./login/LoginPage.tsx";


import {useState} from "react";

function IndexPage() {
    //implement also for header
   function openLogInPage(){
        store.setIsLoginOpen(true);
    }

   function openSignUpPage(){
       store.setIsSignUpOpen(true);
   }
    return (
        <div >
            <Header/>
            <ThinLine/>

            <LoginPage/>

            {/*(store.isLoginOpen||store.isSignUpOpen) &&
                (<LoginPage/>) */}
        </div>

    )
}

export default observer(IndexPage)