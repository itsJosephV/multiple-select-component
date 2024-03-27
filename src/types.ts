import { ChangeEvent, MouseEvent, KeyboardEvent, MutableRefObject } from "react";
export interface TagProps {
  id: number;
  name: string;
}

export type FnContextValue = {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleInputFocus: () => void;
  handleDeleteAllItems: () => void;
  handleItemList: (item: TagProps) => void;
  inputChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDropDownState: (e: MouseEvent<HTMLDivElement>) => void;
  deleteItems: (e: KeyboardEvent<HTMLDivElement>) => void;
  handleDeleteItemFromList: (name: string) => void;
  inputValue: string;
  focus: boolean;
  isOpen: boolean;
  listItems: TagProps[];
  selectedItems: TagProps[];
  cleanerButton: boolean;
  tagContainerRef: React.RefObject<HTMLDivElement>;
  listItemRef: React.RefObject<HTMLLIElement>;
  inputRef: MutableRefObject<HTMLInputElement | null>
  dropdownRef: React.RefObject<HTMLDivElement>;
}