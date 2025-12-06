import { useRef, useState, useEffect } from "react";
import "./Carousel.css";

export default function Carousel({ items }) {
  const carouselRef = useRef(null);
  const [index, setIndex] = useState(0);

  const total = items.length;

  const slideTo = (i) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardWidth = carousel.children[0].offsetWidth + 50;
    let scrollLeft = i * cardWidth - (carousel.offsetWidth - carousel.children[0].offsetWidth) / 2;

    const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
    scrollLeft = Math.min(scrollLeft, maxScrollLeft);
    scrollLeft = Math.max(scrollLeft, 0);

    carousel.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });

    setIndex(i);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const scrollPos = carousel.scrollLeft + carousel.offsetWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      Array.from(carousel.children).forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(scrollPos - childCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setIndex(closestIndex);
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="carousel-wrapper">
        <div className="carousel" ref={carouselRef}>
          {items.map((item, i) => (
            <div key={i} className={`card ${index === i ? "active" : ""}`}>
              <div className="song-img">
                <img src={item.img} alt={item.title} />
              </div>
              <div className="info">
                <p>{item.title}</p>
                <p>Time Spent: {item.time}</p>
                <p>{item.playlist}</p>
                <button className="remove-btn">Remove from Playlist</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dots">
        {items.map((_, i) => (
          <span
            key={i}
            className={`dot ${index === i ? "active" : ""}`}
            onClick={() => slideTo(i)}
          ></span>
        ))}
      </div>

      <div className="arrows">
        <span onClick={() => slideTo(Math.max(index - 1, 0))}>←</span>
        <span onClick={() => slideTo(Math.min(index + 1, total - 1))}>→</span>
      </div>
    </>
  );
}
