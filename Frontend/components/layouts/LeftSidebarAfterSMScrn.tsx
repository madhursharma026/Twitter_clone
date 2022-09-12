import * as React from "react";
import HomeMenuWhite from '../../public/svgs/DarkThemeSvgs/HomeMenuWhite.svg';
import HomeMenuBlack from '../../public/svgs/LightThemeSvgs/HomeMenuBlack.svg';
import SearchMenuWhite from '../../public/svgs/DarkThemeSvgs/SearchMenuWhite.svg';
import SearchMenuBlack from '../../public/svgs/LightThemeSvgs/SearchMenuBlack.svg';
import MessagesMenuWhite from '../../public/svgs/DarkThemeSvgs/MessagesMenuWhite.svg';
import MessagesMenuBlack from '../../public/svgs/LightThemeSvgs/MessagesMenuBlack.svg';
import NotificationsMenuWhite from '../../public/svgs/DarkThemeSvgs/NotificationsMenuWhite.svg';
import NotificationsMenuBlack from '../../public/svgs/LightThemeSvgs/NotificationsMenuBlack.svg';

export default function LeftSidebarAfterSMScrn() {
    return (
        <>
            <div className='py-3 LeftSidebarAfterSMScrn fixed-bottom myApp' style={{ zIndex: "1", bottom: "0" }}>
                <div className="text-center row">
                    <div className="col-3">
                        <img className='LightScrnMenu' src={HomeMenuWhite.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} />
                        <img className='DarkScrnMenu' src={HomeMenuBlack.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} />
                    </div>
                    <div className="col-3">
                        <img className='LightScrnMenu' src={SearchMenuWhite.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} />
                        <img className='DarkScrnMenu' src={SearchMenuBlack.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} />
                    </div>
                    <div className="col-3">
                        <img className='LightScrnMenu' src={NotificationsMenuWhite.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} />
                        <img className='DarkScrnMenu' src={NotificationsMenuBlack.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} />
                    </div>
                    <div className="col-3">
                        <img className='LightScrnMenu' src={MessagesMenuWhite.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} />
                        <img className='DarkScrnMenu' src={MessagesMenuBlack.src} alt="#imgNotFound" width="25px" height="25px" style={{ marginTop: "-10px" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

