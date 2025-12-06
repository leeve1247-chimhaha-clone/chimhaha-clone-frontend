import style from "./ToolbarPlugin.module.css";
import React, {type ReactNode, useId} from "react";

export function ToolBarInput({children, onChange}:{children:ReactNode, onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void}){
    const htmlForId = useId();
    return (
        <label htmlFor={htmlForId}>
            <div className={`${style.toolbarItemButton}`}>
                {children}
                <input id={htmlForId}
                       type="file"
                       accept="image/*"
                       className={style.hiddenInput}
                       onChange={onChange}
                />
            </div></label>
    )
}