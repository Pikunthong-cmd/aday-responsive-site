"use client";

type Props = {
  html: string;
};

export default function KonsanpokFeatureSection({ html }: Props) {
  return (
    <section className="mt-14 px-5 sm:mt-16">
      <div
        className="konsanpok-api-content mx-auto w-full max-w-[1100px] text-black"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <style jsx global>{`
        .konsanpok-api-content {
          width: 100%;
        }

        .konsanpok-api-content > *:first-child {
          margin-top: 0 !important;
        }

        .konsanpok-api-content .wp-block-spacer {
          display: none;
        }

        .konsanpok-api-content h1,
        .konsanpok-api-content h2,
        .konsanpok-api-content h3,
        .konsanpok-api-content h4,
        .konsanpok-api-content h5,
        .konsanpok-api-content h6 {
          margin: 0 auto 1rem;
          color: #000;
          font-weight: 700;
          line-height: 1.25;
        }

        .konsanpok-api-content h1 {
          max-width: 760px;
          font-size: 1.9rem;
          text-align: center;
          margin-top: 3.5rem;
          margin-bottom: 1.25rem;
        }

        .konsanpok-api-content h2 {
          max-width: 760px;
          font-size: 1.6rem;
          text-align: center;
          margin-top: 3.25rem;
          margin-bottom: 1.1rem;
        }

        .konsanpok-api-content h3,
        .konsanpok-api-content h4,
        .konsanpok-api-content h5,
        .konsanpok-api-content h6 {
          max-width: 760px;
          margin-top: 2rem;
          margin-bottom: 0.9rem;
          font-size: 1.2rem;
        }

        @media (min-width: 640px) {
          .konsanpok-api-content h1 {
            font-size: 2.35rem;
          }

          .konsanpok-api-content h2 {
            font-size: 1.95rem;
          }

          .konsanpok-api-content h3,
          .konsanpok-api-content h4,
          .konsanpok-api-content h5,
          .konsanpok-api-content h6 {
            font-size: 1.3rem;
          }
        }

        .konsanpok-api-content p {
          max-width: 760px;
          margin: 0 auto 1.15rem;
          color: rgba(0, 0, 0, 0.9);
          font-size: 0.82rem;
          line-height: 1.9;
        }

        @media (min-width: 640px) {
          .konsanpok-api-content p {
            font-size: 0.95rem;
            line-height: 1.95;
            margin-bottom: 1.2rem;
          }
        }

        .konsanpok-api-content a {
          color: #fe552c;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .konsanpok-api-content a:hover {
          opacity: 0.8;
        }

        .konsanpok-api-content strong {
          color: #000;
          font-weight: 700;
        }

        .konsanpok-api-content figure {
          margin: 1.75rem auto;
          width: 100%;
        }

        .konsanpok-api-content figure + p,
        .konsanpok-api-content .wp-block-image + p,
        .konsanpok-api-content .wp-block-gallery + p {
          margin-top: 1.1rem;
        }

        .konsanpok-api-content p + figure,
        .konsanpok-api-content p + .wp-block-image,
        .konsanpok-api-content p + .wp-block-gallery,
        .konsanpok-api-content h1 + figure,
        .konsanpok-api-content h2 + figure,
        .konsanpok-api-content h3 + figure,
        .konsanpok-api-content h4 + figure,
        .konsanpok-api-content h5 + figure,
        .konsanpok-api-content h6 + figure {
          margin-top: 1.5rem;
        }

        .konsanpok-api-content img {
          display: block;
          width: 100%;
          height: auto;
        }

        .konsanpok-api-content .wp-block-image {
          max-width: 920px;
          margin: 1.75rem auto;
          text-align: center;
        }

        .konsanpok-api-content .wp-block-image img {
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: auto;
          max-width: 100%;
          height: auto;
        }

        .konsanpok-api-content .wp-block-image.aligncenter,
        .konsanpok-api-content .aligncenter {
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        .konsanpok-api-content .wp-block-image figcaption,
        .konsanpok-api-content figcaption {
          max-width: 760px;
          margin: 0.75rem auto 0;
          color: rgba(0, 0, 0, 0.65);
          font-size: 0.72rem;
          line-height: 1.7;
          text-align: center;
        }

        @media (min-width: 640px) {
          .konsanpok-api-content .wp-block-image figcaption,
          .konsanpok-api-content figcaption {
            font-size: 0.8rem;
          }
        }

        .konsanpok-api-content .wp-block-gallery,
        .konsanpok-api-content .blocks-gallery-grid {
          max-width: 920px;
          margin: 2rem auto;
        }

        .konsanpok-api-content > .wp-block-group {
          max-width: 100%;
          margin: 0 auto;
        }

        .konsanpok-api-content .wp-block-group {
          margin-top: 0;
          margin-bottom: 0;
        }

        .konsanpok-api-content .wp-block-columns {
          max-width: 920px;
          margin: 2.25rem auto;
          gap: 1.5rem;
          align-items: flex-start;
        }

        @media (min-width: 768px) {
          .konsanpok-api-content .wp-block-columns {
            gap: 2rem;
          }
        }

        .konsanpok-api-content .wp-block-column {
          min-width: 0;
        }

        .konsanpok-api-content .wp-block-column > *:first-child {
          margin-top: 0 !important;
        }

        .konsanpok-api-content .wp-block-column > *:last-child {
          margin-bottom: 0 !important;
        }

        .konsanpok-api-content ul,
        .konsanpok-api-content ol {
          max-width: 760px;
          margin: 0 auto 1.15rem;
          padding-left: 1.25rem;
          color: rgba(0, 0, 0, 0.9);
          font-size: 0.82rem;
          line-height: 1.9;
        }

        @media (min-width: 640px) {
          .konsanpok-api-content ul,
          .konsanpok-api-content ol {
            font-size: 0.95rem;
            line-height: 1.95;
          }
        }

        .konsanpok-api-content li + li {
          margin-top: 0.35rem;
        }

        .konsanpok-api-content blockquote {
          max-width: 760px;
          margin: 2rem auto;
          padding-left: 1rem;
          border-left: 3px solid #fe552c;
        }

        .konsanpok-api-content blockquote p {
          margin-bottom: 0;
        }

        .konsanpok-api-content hr {
          max-width: 760px;
          margin: 2.5rem auto;
          border: 0;
          border-top: 1px solid rgba(0, 0, 0, 0.12);
        }

        .konsanpok-api-content iframe,
        .konsanpok-api-content video {
          display: block;
          width: 100%;
          max-width: 920px;
          margin: 2rem auto;
        }

        .konsanpok-api-content .wp-block-embed,
        .konsanpok-api-content .wp-block-video {
          max-width: 920px;
          margin: 2rem auto;
        }

        .konsanpok-api-content .wp-block-separator {
          max-width: 760px;
          margin: 2.5rem auto;
        }

        .konsanpok-api-content .has-text-align-center,
        .konsanpok-api-content .aligncenter {
          text-align: center;
        }

        .konsanpok-api-content .has-text-align-left {
          text-align: left;
        }

        .konsanpok-api-content .has-text-align-right {
          text-align: right;
        }

        .konsanpok-api-content .wp-block-table {
          max-width: 920px;
          margin: 2rem auto;
          overflow-x: auto;
        }

        .konsanpok-api-content table {
          width: 100%;
          border-collapse: collapse;
        }

        .konsanpok-api-content th,
        .konsanpok-api-content td {
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 0.75rem;
          font-size: 0.85rem;
          line-height: 1.6;
          text-align: left;
        }

        .konsanpok-api-content > p:has(img) {
          max-width: 920px;
        }

        .konsanpok-api-content > p:has(img) img {
          margin-left: auto;
          margin-right: auto;
        }

        .konsanpok-api-content .wp-block-group > .wp-block-columns:first-of-type {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          max-width: 920px;
          margin: 0 auto 3rem;
          align-items: start;
        }

        @media (min-width: 768px) {
          .konsanpok-api-content .wp-block-group > .wp-block-columns:first-of-type {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 3rem;
          }
        }

        .konsanpok-api-content
          .wp-block-group
          > .wp-block-columns:first-of-type
          > .wp-block-column
          > p:first-child {
          font-size: 1.05rem;
          line-height: 1.5;
          margin-bottom: 0.9rem;
        }

        @media (min-width: 640px) {
          .konsanpok-api-content
            .wp-block-group
            > .wp-block-columns:first-of-type
            > .wp-block-column
            > p:first-child {
            font-size: 1.18rem;
          }
        }

        .konsanpok-api-content .wp-block-group > .wp-block-columns:last-of-type {
          max-width: 920px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 0;
        }

        @media (min-width: 480px) {
          .konsanpok-api-content .wp-block-group > .wp-block-columns:last-of-type {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 900px) {
          .konsanpok-api-content .wp-block-group > .wp-block-columns:last-of-type {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        .konsanpok-api-content
          .wp-block-group
          > .wp-block-columns:last-of-type
          > .wp-block-column,
        .konsanpok-api-content
          .wp-block-group
          > .wp-block-columns:last-of-type
          > .wp-block-column
          > .wp-block-group.is-layout-grid,
        .konsanpok-api-content
          .wp-block-group
          > .wp-block-columns:last-of-type
          > .wp-block-column
          > .wp-block-group.is-layout-flex,
        .konsanpok-api-content
          .wp-block-group
          > .wp-block-columns:last-of-type
          .wp-block-columns {
          display: contents;
          margin: 0;
          padding: 0 !important;
        }

        .konsanpok-api-content
          .wp-block-group
          > .wp-block-columns:last-of-type
          p.has-background {
          min-height: 150px;
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          font-size: 0.95rem;
          line-height: 1.15;
          font-weight: 800;
          color: #000;
          margin: 0;
        }

        @media (min-width: 640px) {
          .konsanpok-api-content
            .wp-block-group
            > .wp-block-columns:last-of-type
            p.has-background {
            min-height: 170px;
            padding: 1.15rem;
            font-size: 1rem;
          }
        }

        @media (min-width: 900px) {
          .konsanpok-api-content
            .wp-block-group
            > .wp-block-columns:last-of-type
            p.has-background {
            min-height: 190px;
            padding: 1.25rem;
          }
        }

        .konsanpok-api-content
          .wp-block-group
          > .wp-block-columns:last-of-type
          .wp-block-image {
          width: 100%;
          max-width: none;
          margin: 0;
        }

        .konsanpok-api-content
          .wp-block-group
          > .wp-block-columns:last-of-type
          .wp-block-image img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
        }
      `}</style>
    </section>
  );
}