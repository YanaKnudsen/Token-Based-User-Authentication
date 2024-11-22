import ThinLine from "../components/ThinLine.tsx";
import store from "../mobx/AppDataStore.ts";
import Header from "../components/Header.tsx";
import ProfileNav from "../components/ProfileNav.tsx";

function ProfilePage() {




    return (
        <div className="">
            Hello {store.user?.name} !</div>

    )
}

export default ProfilePage