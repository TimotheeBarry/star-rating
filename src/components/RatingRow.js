import Star from "./Star";
import { useEffect, useState } from "react";
import { getColor, interpolateRating } from "../functions";

function RatingRow({ rating, title, setRating, isTotal, hide }) {
    const [stars, setStars] = useState([]);
    var isClickable = !isTotal;

    const buildStars = (ratingValue) => {
        const color = getColor(ratingValue);
        var stars = [];
        for (let i = 0; i < 5; i++) {
            var filledPercentage = Math.min(Math.max(ratingValue - i, 0), 1);
            stars.push(
                <Star
                    key={i}
                    rating={filledPercentage}
                    onClick={isClickable ? () => handleRatingChange(ratingValue, i + 1) : null}
                    color={color}

                />);
        }
        setStars(stars);
    }

    useEffect(() => {
        buildStars(rating);
    }, []);


    useEffect(() => {
        if (isTotal) {
            buildStars(rating);
        }

    }, [rating]);


    function interpolateRating(oldRating, newRating, duration) {
        const easeOut = (t) => {
            return 1 - Math.pow(1 - t, 2);
        };
        const updateInterval = 1000 / 60; // Milliseconds between updates (adjust as needed)
        const totalFrames = duration / updateInterval;
        let frame = 0;

        const updateStars = () => {
            const t = easeOut(frame / totalFrames);
            const interpolatedRating = oldRating + (newRating - oldRating) * t;
            setRating(interpolatedRating);
            buildStars(interpolatedRating);

            frame++;
            if (frame <= totalFrames) {
                setTimeout(updateStars, updateInterval);
            }
        };
        updateStars();
    }

    function handleRatingChange(oldRating, newRating) {
        var duration = Math.abs(newRating - oldRating) / 5 * 300;
        interpolateRating(oldRating, newRating, duration);
    }
    return (
        <div className={hide == true? 'rating-row-container hide': 'rating-row-container'}>
            <div className="rating-row-title">{title}</div>
            <div className="rating-row">
                {stars}
            </div>
        </div>

    );
}

export default RatingRow;