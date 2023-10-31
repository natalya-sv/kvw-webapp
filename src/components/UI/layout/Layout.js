import AppNavigation from "../navigation/AppNavigation";
import { devColor, mainColor } from "../../../global";

const isDev = process.env.REACT_APP_API_URL.includes(
  process.env.REACT_APP_DEV_PREFIX
);
const Layout = (props) => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <AppNavigation />
      <main>{props.children}</main>
      <footer
        style={{
          height: "100px",
          textAlign: "center",
          padding: "5px",
          backgroundColor: isDev ? devColor : mainColor,
          color: "#000",
          width: "100%",
        }}
      >
        <small>
          <p>
            Version: {process.env.REACT_APP_BUILD_NUMBER} {isDev ? "DEV" : ""}
          </p>
          <p>
            Copyright © 2023 Kindervakantieweek Brandevoort. All Rights
            Reserved.
          </p>
        </small>
      </footer>
    </div>
  );
};

export default Layout;
