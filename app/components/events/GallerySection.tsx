"use client";

import Image from "next/image";
import Link from "next/link";
import "./GallerySection.scss";

export type GalleryItem = {
  title: string;
  image: string;
  slug: string;
};

type Props = {
  title?: string;
  data: GalleryItem[];
  bg?: "light" | "white";
  asH1?: boolean;
};

export default function GallerySection({
  title = "Event Gallery",
  data,
  bg = "light",
  asH1 = false,
}: Props) {
  return (
    <section className={`gallery-section gallery-section--${bg}`}>
       <span className="gallery-section__orb gallery-section__orb--1" />
      <span className="gallery-section__orb gallery-section__orb--2" />

      <div className="gallery-section__container">
         <div className="gallery-section__heading">
       
          {asH1 ? (
            <h1 className="gallery-section__title">{title}</h1>
          ) : (
            <h2 className="gallery-section__title">{title}</h2>
          )}
          <p className="gallery-section__subtitle">
            Explore moments from our global events and conferences
          </p>
        </div>

         <div className="gallery-grid">
          {data.map((item, index) => (
            <Link
             href={`/gallery/${item.slug}`}
              key={index}
              className="gallery-card"
            >
               <div className="gallery-card__image-wrap">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="gallery-card__image"
                />
                 <div className="gallery-card__overlay" />

                 <div className="gallery-card__arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

               <div className="gallery-card__footer">
                <span className="gallery-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="gallery-card__title">{item.title}</h3>
                <span className="gallery-card__cta">View Photos →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}