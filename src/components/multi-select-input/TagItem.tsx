import { DeleteIcon } from "../../icons/DeleteIcon";

export const TagItem = ({
  name,
  handleDeleteItemFromList,
}: {
  name: string;
  handleDeleteItemFromList: (name: string) => void;
}) => {
  return (
    <div
      id="tag-item"
      className="tag-item"
      style={{
        padding: "3px 6px",
        backgroundColor: "#e7e5e4",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        gap: "3px",
        minHeight: "25px",
      }}
    >
      <div
        style={{
          color: "#57534e",
          cursor: "default",
          overflow: "hidden",
          textOverflow: "ellipsis",
          flex: "1",
        }}
      >
        <span style={{ fontSize: "14px" }}>{name}</span>
      </div>
      <button
        id="tag-btn"
        style={{ all: "unset", cursor: "pointer", display: "inline-flex" }}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteItemFromList(name);
        }}
      >
        <DeleteIcon
          style={{ color: "#a8a29e", transition: "all 200ms" }}
          className="delete-icon"
        />
      </button>
    </div>
  );
};
