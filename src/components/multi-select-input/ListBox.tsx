import { TagProps } from "../../types";
import ListItem from "./ListItem";

type Props = {
  listItems: TagProps[];
  selectedItems: TagProps[];
  listItemRef: React.RefObject<HTMLLIElement>;
  handleItemList: (item: TagProps) => void;
};
const ListBox = ({
  selectedItems,
  listItemRef,
  handleItemList,
  listItems,
}: Props) => {
  return (
    <ul className="gap-1 flex flex-col" id="list-box" role="listbox">
      {listItems.map((item) => {
        return (
          <ListItem
            selectedItems={selectedItems}
            listItemRef={listItemRef}
            handleItemList={handleItemList}
            key={item.id}
            item={item}
          />
        );
      })}
    </ul>
  );
};

export default ListBox;
