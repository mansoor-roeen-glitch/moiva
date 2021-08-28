import React from 'react';
import "../styles/itemPlaceholder.css";

export default function ItemPlaceholder() {
    return (
        <div className="grid-item-t1 ph" style={{overflow: "hidden", background: "transparent"}}>
            <div className="grid-item-t1-swip-wrapper grid-item-t1-bd-wrapper">
                <div className="grid-item-ph-swipper grid-item-t1-bd-wrapper"></div>
            </div>
            <div className="grid-item-t1-ph-items-wrapper grid-item-t1-info">
                <div className="item-ph-row1 item-ph-row">
                    <div className="item-ph-swipper"></div>
                </div>
                <div className="item-ph-row2 item-ph-row">
                    <div className="item-ph-swipper"></div>
                </div>
            </div>
        </div>
    )
}
