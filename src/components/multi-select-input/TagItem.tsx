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
      className="tag-item px-1.5 rounded-[4px] flex items-center gap-1 min-h-[25px] bg-stone-200"
    >
      <div className="cursor-default overflow-hidden text-ellipsis flex-1">
        <span className="text-sm text-stone-600">{name}</span>
      </div>
      <button
        id="tag-btn"
        className="cursor-pointer inline-flex"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteItemFromList(name);
        }}
      >
        <DeleteIcon className="duration-200 text-stone-400 hover:text-stone-600" />
      </button>
    </div>
  );
};
