import Link from 'next/link'
import * as React from "react";
import PostBtn from '../../public/svgs/DarkThemeSvgs/PostBtn.svg';
import ListMenuWhite from '../../public/svgs/DarkThemeSvgs/ListMenuWhite.svg';
import MoreMenuWhite from '../../public/svgs/DarkThemeSvgs/MoreMenuWhite.svg';
import HomeMenuWhite from '../../public/svgs/DarkThemeSvgs/HomeMenuWhite.svg';
import ListMenuBlack from '../../public/svgs/LightThemeSvgs/ListMenuBlack.svg';
import MoreMenuBlack from '../../public/svgs/LightThemeSvgs/MoreMenuBlack.svg';
import HomeMenuBlack from '../../public/svgs/LightThemeSvgs/HomeMenuBlack.svg';
import ExploreMenuWhite from '../../public/svgs/DarkThemeSvgs/ExploreMenuWhite.svg';
import ProfileMenuWhite from '../../public/svgs/DarkThemeSvgs/ProfileMenuWhite.svg';
import ProfileMenuBlack from '../../public/svgs/LightThemeSvgs/ProfileMenuBlack.svg';
import ExploreMenuBlack from '../../public/svgs/LightThemeSvgs/ExploreMenuBlack.svg';
import MessagesMenuWhite from '../../public/svgs/DarkThemeSvgs/MessagesMenuWhite.svg';
import BookmarkMenuWhite from '../../public/svgs/DarkThemeSvgs/BookmarkMenuWhite.svg';
import MessagesMenuBlack from '../../public/svgs/LightThemeSvgs/MessagesMenuBlack.svg';
import BookmarkMenuBlack from '../../public/svgs/LightThemeSvgs/BookmarkMenuBlack.svg';
import NotificationsMenuWhite from '../../public/svgs/DarkThemeSvgs/NotificationsMenuWhite.svg';
import NotificationsMenuBlack from '../../public/svgs/LightThemeSvgs/NotificationsMenuBlack.svg';

export default function LeftSidebar() {

    const [pathnameIsHome, setPathnameIsHome] = React.useState(Boolean(""))
    const [pathnameIsExplore, setPathnameIsExplore] = React.useState(Boolean(""))
    const [pathnameIsMyProfile, setPathnameIsMyProfile] = React.useState(Boolean(""))

    React.useEffect(() => {
        if (window.location.pathname === "/") {
            setPathnameIsHome(true)
        } else {
            setPathnameIsHome(false)
        }
        if (window.location.pathname === "/Explore") {
            setPathnameIsExplore(true)
        } else {
            setPathnameIsExplore(false)
        }
        if (window.location.pathname === "/myProfile") {
            setPathnameIsMyProfile(true)
        } else {
            setPathnameIsMyProfile(false)
        }
    })

    return (
        <>
            <ol style={{ listStyleType: "none", padding: "0" }} className="mt-4 px-xl-3">
                <li style={{ border: "0", borderRadius: "0", fontWeight: `${pathnameIsHome ? "700" : ""}` }} className='mt-3'>
                    <Link href="/">
                        <a style={{ textDecoration: "none" }} className='pt-3 pb-3 px-sm-3 menu_hover'>
                            <span className='LightScrnMenu'><img src={HomeMenuWhite.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Home &emsp;</span></span>
                            <span className='DarkScrnMenu'><img src={HomeMenuBlack.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Home &emsp;</span></span>
                        </a>
                    </Link>
                </li>
                <li style={{ border: "0", borderRadius: "0" }} className='pt-3 mt-3'>
                    <Link href="/Explore">
                        <a style={{ textDecoration: "none", fontWeight: `${pathnameIsExplore ? "700" : ""}` }} className='pt-3 pb-3 px-sm-3 menu_hover'>
                            <span className='LightScrnMenu'><img src={ExploreMenuWhite.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Explore &emsp;</span></span>
                            <span className='DarkScrnMenu'><img src={ExploreMenuBlack.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Explore &emsp;</span></span>
                        </a>
                    </Link>
                </li>
                <li style={{ border: "0", borderRadius: "0" }} className='pt-3 mt-3'>
                    <Link href="/">
                        <a style={{ textDecoration: "none" }} className='pt-3 pb-3 px-sm-3 menu_hover'>
                            <span className='LightScrnMenu'><img src={NotificationsMenuWhite.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Notifications &emsp;</span></span>
                            <span className='DarkScrnMenu'><img src={NotificationsMenuBlack.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Notifications &emsp;</span></span>
                        </a>
                    </Link>
                </li>
                <li style={{ border: "0", borderRadius: "0" }} className='pt-3 mt-3'>
                    <Link href="/">
                        <a style={{ textDecoration: "none" }} className='pt-3 pb-3 px-sm-3 menu_hover'>
                            <span className='LightScrnMenu'><img src={MessagesMenuWhite.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Messages &emsp;</span></span>
                            <span className='DarkScrnMenu'><img src={MessagesMenuBlack.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Messages &emsp;</span></span>
                        </a>
                    </Link>
                </li>
                <li style={{ border: "0", borderRadius: "0" }} className='pt-3 mt-3'>
                    <Link href="/">
                        <a style={{ textDecoration: "none" }} className='pt-3 pb-3 px-sm-3 menu_hover'>
                            <span className='LightScrnMenu'><img src={BookmarkMenuWhite.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Bookmarks &emsp;</span></span>
                            <span className='DarkScrnMenu'><img src={BookmarkMenuBlack.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Bookmarks &emsp;</span></span>
                        </a>
                    </Link>
                </li>
                <li style={{ border: "0", borderRadius: "0" }} className='pt-3 mt-3'>
                    <Link href="/">
                        <a style={{ textDecoration: "none" }} className='pt-3 pb-3 px-sm-3 menu_hover'>
                            <span className='LightScrnMenu'><img src={ListMenuWhite.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Lists &emsp;</span></span>
                            <span className='DarkScrnMenu'><img src={ListMenuBlack.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Lists &emsp;</span></span>
                        </a>
                    </Link>
                </li>
                <li style={{ border: "0", borderRadius: "0" }} className='pt-3 mt-3'>
                    <Link href="/myProfile">
                        <a style={{ textDecoration: "none", fontWeight: `${pathnameIsMyProfile ? "700" : ""}` }} className='pt-3 pb-3 px-sm-3 menu_hover'>
                            <span className='LightScrnMenu'><img src={ProfileMenuWhite.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Profile &emsp;</span></span>
                            <span className='DarkScrnMenu'><img src={ProfileMenuBlack.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;Profile &emsp;</span></span>
                        </a>
                    </Link>
                </li>
                <li style={{ border: "0", borderRadius: "0" }} className='pt-3 mt-3'>
                    <Link href="/">
                        <a style={{ textDecoration: "none" }} className='pt-3 pb-3 px-sm-3 menu_hover'>
                            <span className='LightScrnMenu'><img src={MoreMenuWhite.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;More &emsp;</span></span>
                            <span className='DarkScrnMenu'><img src={MoreMenuBlack.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} /><span style={{ fontSize: "20px" }} className="menuName">  &emsp;More &emsp;</span></span>
                        </a>
                    </Link>
                </li>
                <li style={{ border: "0", borderRadius: "0" }} className='pt-3 mt-3 TweetBtnBeforeXlScrn'>
                    <button type="button" className="py-2 text-center text-white btn" style={{ background: '#1A8CD8', width: "100%", borderRadius: "30px", fontSize: "20px" }}><b>Tweet</b></button>
                </li>
                <li style={{ border: "0", borderRadius: "0" }} className='pt-3 mt-3 TweetBtnAfterXlScrn'>
                    <button type="button" className="text-center text-white btn" style={{ background: '#1A8CD8', borderRadius: "100%", fontSize: "22px" }}><img src={PostBtn.src} alt="#imgNotFound" width="25px" height="25px" /></button>
                </li>
            </ol>
        </>
    )
}

