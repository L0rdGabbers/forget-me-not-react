// Import the jwt-decode library to decode JSON Web Tokens (JWTs)
import jwtDecode from "jwt-decode";

// Function to set the timestamp of the refresh token expiration in local storage
export const setTokenTimestamp = (data) => {
    // Extract the expiration timestamp from the refresh token using jwt-decode
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    
    // Store the refresh token expiration timestamp in local storage
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

// Function to check if the refresh token timestamp is stored in local storage
export const shouldRefreshToken = () => {
    // Return true if the refresh token timestamp is present, indicating the need for a token refresh
    return !!localStorage.getItem("refreshTokenTimestamp");
};

// Function to remove the refresh token timestamp from local storage
export const removeTokenTimestamp = () => {
    // Remove the refresh token timestamp from local storage
    localStorage.removeItem("refreshTokenTimestamp");
};
