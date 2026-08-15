"use client";

import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import styles from "./PremiumGallery.module.css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const images = [
    { id: 1, url: 'https://placehold.co/600x800/1a1a1a/c5a45c?text=Tonic+Pouring+1' },
    { id: 2, url: 'https://placehold.co/600x800/1a1a1a/c5a45c?text=Tonic+Pouring+2' },
    { id: 3, url: 'https://placehold.co/600x800/1a1a1a/c5a45c?text=Tonic+Pouring+3' },
    { id: 4, url: 'https://placehold.co/600x800/1a1a1a/c5a45c?text=Tonic+Pouring+4' },
    { id: 5, url: 'https://placehold.co/600x800/1a1a1a/c5a45c?text=Tonic+Pouring+5' },
    { id: 6, url: 'https://placehold.co/600x800/1a1a1a/c5a45c?text=Tonic+Pouring+6' },
    { id: 7, url: 'https://placehold.co/600x800/1a1a1a/c5a45c?text=Tonic+Pouring+7' },
    { id: 8, url: 'https://placehold.co/600x800/1a1a1a/c5a45c?text=Tonic+Pouring+8' },
    { id: 9, url: 'https://placehold.co/600x800/1a1a1a/c5a45c?text=Tonic+Pouring+9' },
    { id: 10, url: 'https://placehold.co/600x800/1a1a1a/c5a45c?text=Tonic+Pouring+10' },
];

const PremiumGallery = () => {
    const containerRef = useRef<HTMLElement>(null);
    const column1Ref = useRef<HTMLDivElement>(null);
    const column2Ref = useRef<HTMLDivElement>(null);
    const column3Ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            let mm = gsap.matchMedia();

            mm.add("(min-width: 769px)", () => {
                // Reverse Parallax Effect for Desktop
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1, // Smooth scrubbing
                    },
                });

                // Outer columns move slower/upwards
                tl.to(column1Ref.current, { y: "-15%", ease: "none" }, 0);
                tl.to(column3Ref.current, { y: "-15%", ease: "none" }, 0);

                // Center column moves faster/downwards, creating depth
                tl.to(column2Ref.current, { y: "15%", ease: "none" }, 0);
            });

            mm.add("(max-width: 768px)", () => {
                // Sequential fade-up for mobile
                const items = gsap.utils.toArray(`.${styles.galleryItem}`);
                items.forEach((item: any, i) => {
                    gsap.from(item, {
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                        },
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                    });
                });
            });

            return () => mm.revert();
        },
        { scope: containerRef }
    );

    return (
        <section className={styles.section} ref={containerRef} id="gallery">
            <div className={styles.header}>
                <h2 className={styles.title}>The Art of Pouring</h2>
                <p className={styles.subtitle}>Discover the essence of our curated experiences.</p>
            </div>

            <div className={styles.galleryGrid}>
                {/* Column 1 */}
                <div className={`${styles.column} ${styles.colOuter}`} ref={column1Ref}>
                    {images.slice(0, 3).map((img) => (
                        <div key={img.id} className={styles.galleryItem}>
                            <img src={img.url} alt="Premium Experience" className={styles.image} loading="lazy" />
                            <div className={styles.overlay}></div>
                        </div>
                    ))}
                </div>

                {/* Column 2 (Center) */}
                <div className={`${styles.column} ${styles.colCenter}`} ref={column2Ref}>
                    {images.slice(3, 7).map((img) => (
                        <div key={img.id} className={styles.galleryItem}>
                            <img src={img.url} alt="Premium Experience" className={styles.image} loading="lazy" />
                            <div className={styles.overlay}></div>
                        </div>
                    ))}
                </div>

                {/* Column 3 */}
                <div className={`${styles.column} ${styles.colOuter}`} ref={column3Ref}>
                    {images.slice(7, 10).map((img) => (
                        <div key={img.id} className={styles.galleryItem}>
                            <img src={img.url} alt="Premium Experience" className={styles.image} loading="lazy" />
                            <div className={styles.overlay}></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PremiumGallery;
