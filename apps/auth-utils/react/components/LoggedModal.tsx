import React from "react";
import { useRuntime } from "vtex.render-runtime";
import { useCssHandles } from "vtex.css-handles";
const CSS_HANDLES = ["LoggedModalWrapper","loggedModalOption"] as const;

const options = ["/account","/logout"];

const LoggedModal = () => {
    const { handles } = useCssHandles(CSS_HANDLES);
    const { navigate } = useRuntime();

    return <div className={handles.LoggedModalWrapper}>
            {
                options.map((option,index) => {
                    return <button className={handles.loggedModalOption} key={index} onClick={() => navigate({ to: option })}>{option === "/account" ? "Minha Conta" : "Sair"}</button>
                })
            }
    </div>;
}

export default LoggedModal;