import { useFnContext } from "../../context/useFnContext";
import ListItem from "./ListItem";

const ListBox = () => {
  const { listItems } = useFnContext();
  return (
    <ul className="gap-1 flex flex-col" id="list-box" role="listbox">
      {listItems.map((item) => {
        return <ListItem item={item} />;
      })}
    </ul>
  );
};

export default ListBox;
