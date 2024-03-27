import { NoDataIcon } from "../../icons/NoDataIcon";

export const NoData = () => {
  return (
    <div
      id="no-data-feedack"
      className="no-data-container"
      style={{
        padding: "10px 0",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <NoDataIcon
            style={{
              width: "50px",
              height: "50px",
              color: "#d6d3d1",
            }}
          />
        </div>
        <p style={{ color: "#d6d3d1" }}>No data</p>
      </div>
    </div>
  );
};
