import { useFnContext } from "../../context/useFnContext";
import { AddedIcon } from "../../icons/AddedIcon";
import { TagProps } from "../../types";

const ListItem = ({ item }: { item: TagProps }) => {
  const { handleItemList, listItemRef, selectedItems } = useFnContext();
  return (
    <li
      role="option"
      id="list-option"
      aria-selected={selectedItems.includes(item)}
      title={item.name}
      ref={listItemRef}
      key={item.id}
      className="flex items-center p-1 rounded-[4px] cursor-pointer h-[30px] hover:bg-stone-100"
      onClick={() => handleItemList(item)}
      style={{
        backgroundColor: `${selectedItems.includes(item) ? "#ede9fe" : ""}`,
      }}
    >
      <div
        className="pl-1 text-sm overflow-hidden text-ellipsis flex-1"
        style={{
          color: "#57534e",
        }}
      >
        {item.name}
      </div>
      {selectedItems.includes(item) && (
        <div className="p-1.5 inline-flex">
          <AddedIcon style={{ color: "#a78bfa" }} className="added-icon" />
        </div>
      )}
    </li>
  );
};

export default ListItem;
