import { useFnContext } from "../../context/useFnContext";
import { AddedIcon } from "../../icons/AddedIcon";

const ListBox = () => {
  const { handleItemList, listItemRef, listItems, selectedItems } =
    useFnContext();
  return (
    <ul
      id="list-box"
      role="listbox"
      style={{
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        margin: "0",
        padding: "0",
        gap: "3px",
      }}
    >
      {listItems.map((item) => {
        return (
          <li
            role="option"
            id="list-option"
            aria-selected={selectedItems.includes(item)}
            title={item.name}
            ref={listItemRef}
            key={item.id}
            className="list-item"
            onClick={() => handleItemList(item)}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: `${
                selectedItems.includes(item) ? "#ede9fe" : ""
              }`,
              padding: "3px",
              borderRadius: "4px",
              cursor: "pointer",
              height: "30px",
            }}
          >
            <div
              style={{
                paddingLeft: "5px",
                fontSize: "14px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                flex: "1",
                color: "#57534e",
              }}
            >
              {item.name}
            </div>
            {selectedItems.includes(item) && (
              <div
                style={{
                  paddingRight: "5px",
                  display: "inline-flex",
                }}
              >
                <AddedIcon
                  style={{ color: "#a78bfa" }}
                  className="added-icon"
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ListBox;
