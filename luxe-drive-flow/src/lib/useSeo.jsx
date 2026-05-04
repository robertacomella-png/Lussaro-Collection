import { useEffect } from "react";

const defaultMeta = {
  title: "Lussaro Collection | Miami Luxury Car Rentals",
  description:
    "Lussaro Collection offers Miami luxury car rentals with exotic vehicles, premium delivery, and fast WhatsApp booking across South Beach and Brickell.",
  url: "https://www.lussarocollection.com",
  image: "https://www.lussarocollection.com/preview.png",
  type: "website",
};

function setMetaTag(attribute, key, value) {
  if (typeof document === "undefined") return;

  const selector = `meta[${attribute}='${key}']`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", value);
}

function setLinkTag(rel, href) {
  if (typeof document === "undefined") return;

  let element = document.head.querySelector(`link[rel='${rel}']`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export function useSeo({ title, description, url, image, type }) {
  useEffect(() => {
    const pageTitle = title
      ? `${title} | Lussaro Collection`
      : defaultMeta.title;
    document.title = pageTitle;

    setMetaTag("name", "description", description || defaultMeta.description);
    setMetaTag(
      "name",
      "keywords",
      "Miami luxury car rental, exotic car rental Miami, Lamborghini rental Miami, G-Wagon rental Miami, Mercedes-AMG G63, luxury SUV rental"
    );
    setMetaTag("property", "og:title", pageTitle);
    setMetaTag(
      "property",
      "og:description",
      description || defaultMeta.description
    );
    setMetaTag("property", "og:url", url || defaultMeta.url);
    setMetaTag("property", "og:type", type || defaultMeta.type);
    setMetaTag("property", "og:image", image || defaultMeta.image);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", pageTitle);
    setMetaTag(
      "name",
      "twitter:description",
      description || defaultMeta.description
    );
    setMetaTag("name", "twitter:image", image || defaultMeta.image);
    setLinkTag("canonical", url || defaultMeta.url);
  }, [title, description, url, image, type]);
}
