import React from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "green" : 'white'
    }
    return (
        <div  onClick={props.onClick} className="die" style={styles}>
            <h2>{props.value}</h2>
        </div>
    )
}