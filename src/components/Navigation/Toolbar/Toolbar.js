import react from "react";
import './Toolbar.css'
// import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar =(props) =>(
    <header className="Toolbar">
        {/* menu items */}
        <DrawerToggle  clicked={props.drawerToggleClicked}/> 
        {/* <div className="Logo">
        <Logo/>
        </div> */}
        <div>Logo</div>
        <nav className="DesktopOnly">
            <NavigationItems/>
        </nav>
    </header>
);


export default toolbar;