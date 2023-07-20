import React from "react";
import "../styles/Star.css";
import { makeid } from "../functions";

function Star(props) {
    const { onClick, rating, color } = props;
    const radius = 40;
    const id = makeid(10);


    const goldenRatio = 1.61803398875;

    const getPoints = () => {
        const points = [];
        for (let i = 0; i < 10; i++) {
            var theta = (Math.PI * 2 * i) / 10 + Math.PI / 2;
            var r = i % 2 === 0 ? radius : radius * 1 / (1 + goldenRatio);

            var x = r * Math.cos(theta);
            var y = r * Math.sin(theta);

            if (Math.abs(x) < 1e-14) x = 0;
            if (Math.abs(y) < 1e-14) y = 0;

            //changement de repère
            const X = x + radius;
            const Y = radius - y;
            points.push(X + "," + Y);
        }
        return points.join(" ");
    }

    const buildMask = () => (
        <defs>
            <mask id={id}>
                {/* Masque blanc: garde cette partie là (englobe tout)*/}
                <rect x="0"
                    y="0"
                    width={2 * radius}
                    height={2 * radius}
                    fill="white" />
                {/* Masque noir: retire cette partie là*/}
                <rect x={2 * radius * rating}
                    y="0"
                    width={2 * radius}
                    height={2 * radius}
                    fill="black"
                />
            </mask>
        </defs>

    )

    return (
        <div
            className={`star ${onClick ? "clickable" : ""}`}
            onClick={onClick}
        >
            <svg viewBox={`0 0 ${2 * radius} ${2 * radius}`}>
                {buildMask()}
                <polygon points={getPoints()} fill={color} mask={`url(#${id})`} />
                <polygon points={getPoints()} fill="none" stroke="black" strokeWidth={1.5} />
            </svg>
        </div>
    )
};

export default Star;