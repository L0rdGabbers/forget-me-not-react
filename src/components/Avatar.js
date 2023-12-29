// Avatar.js
// Displays a circular image containing a user's profile image.
import React from "react";
import styles from "../styles/Avatar.module.css";

// Returns a circular image specific to a user's profile_image
const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      {/* Avatar image with a circular style */}
      <img
        className={styles.Avatar}
        src={src}
        alt="User Avatar"
        height={height}
        width={height}
      />
      {/* Additional text or content displayed alongside the avatar */}
      {text}
    </span>
  );
};

export default Avatar;