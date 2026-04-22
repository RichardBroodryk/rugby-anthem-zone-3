import React from "react";
import styles from "./PageWrapper.module.css";

type PageWrapperProps = {
  children: React.ReactNode;
  bg?: "default" | "lightGrey" | "skyBlue" | "springbok";
  imageUrl?: string;
};

export default function PageWrapper({
  children,
  bg = "default",
  imageUrl,
}: PageWrapperProps) {
  return (
    <div
      className={`${styles.page} ${styles[bg]}`}
      style={
        imageUrl
          ? { backgroundImage: `url(${imageUrl})` }
          : undefined
      }
    >
      {children}
    </div>
  );
}