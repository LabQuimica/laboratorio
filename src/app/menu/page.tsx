import { useState } from "react";

function Menu() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-light-bg dark:bg-dark-bg dark:text-white">
        
        <img
          src="/assets/logo.png"
          alt="logo"
          style={{
            width: "400px",
            height: "400px",
          }}
        />
        <h1 style={{ fontSize: "38px", marginTop: "30px" }} className="font-bold">
          BIENVENIDO/A
        </h1>
      </div>
    )
}

export default Menu;
