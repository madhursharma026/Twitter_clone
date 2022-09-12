import '../styles/globals.css'
import { Provider } from "react-redux";
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import store, { persistor } from "../store";
import LeftSidebar from '../components/layouts/LeftSidebar';
import RightSidebar from '../components/layouts/RightSidebar';
import LeftSidebarAfterSMScrn from '../components/layouts/LeftSidebarAfterSMScrn';

function MyApp({ Component, pageProps }: AppProps) {

  const [theme, setTheme] = useState("light-theme");
  const [pathnameAuth, setPathnameAuth] = useState(false)

  const toogleTheme = () => {
    if (theme == "dark-theme") {
      setTheme("light-theme")

    } else {
      setTheme("dark-theme")
    }
  }

  useEffect(() => {
    document.body.className = theme
    if (window.location.pathname === '/Auth') {
      setPathnameAuth(true)
    }
  })

  return (
    <>
      <Provider store={store}>
          {!pathnameAuth ?
            <>
              <div className='myApp' style={{ overflowX: "hidden", marginTop: "48px" }}>
                <div className="container-md">
                  <div className="row">
                    <div className="col-sm-2 col-lg-1 col-xl-3 leftSidebarMenu">
                      <div style={{ position: 'fixed' }}>
                        <LeftSidebar />
                        <label className="switch mx-xl-3">
                          <input type="checkbox" onClick={toogleTheme} />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                    <div className="p-0 m-0 col-12 col-sm-10 col-lg-7 col-xl-5 MainContent">
                      <LeftSidebarAfterSMScrn />
                      <Component {...pageProps} />
                    </div>
                    <div className="col-lg-4 RightSidebarMenu">
                      <div className='feeds_container' style={{ position: "fixed" }}>
                        <div className='pb-5 feeds' style={{ overflowX: "hidden", overflowY: "scroll", height: "94vh" }}>
                          <RightSidebar />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
            :
            <div>
              <Component {...pageProps} />
            </div>
          }
      </Provider>
    </>
  )
}

export default MyApp

