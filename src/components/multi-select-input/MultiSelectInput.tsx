import AutosizeInput from "react-input-autosize";

import { CleanIcon } from "../../icons/CleanIcon";
import { SearchIcon } from "../../icons/SearchIcon";
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";
import { NoData } from "./NoData";
import { TagItem } from "./TagItem";
import ListBox from "./ListBox";
import {
  ChangeEvent,
  KeyboardEvent,
  // MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { ITEMS } from "../../constant";
import { TagProps } from "../../types";
import { useOnClickOutside } from "usehooks-ts";

const MultiSelectInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectMultipleContainerRef = useRef<HTMLDivElement | null>(null);
  const listItemRef = useRef<HTMLLIElement | null>(null);

  const [listItems, setListItems] = useState<TagProps[]>(ITEMS);
  const [selectedItems, setSelectedItems] = useState<TagProps[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const [cleanerButton, setCleanerButton] = useState<boolean>(false);

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    if (value) {
      setIsOpen(true);
      setCleanerButton(true);
      const filteredItems = ITEMS.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setListItems(filteredItems);
    } else {
      setListItems(ITEMS);
    }
  };

  const handleDropDownState = (): void => {
    setIsOpen(!isOpen);
    if (inputValue) {
      setInputValue("");
    }
    setListItems(ITEMS);
  };

  const handleInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setFocus(true);
    }
  };

  const handleItemList = (item: TagProps): void => {
    const isSelected = selectedItems.includes(item);
    setSelectedItems((prevItems) =>
      isSelected ? prevItems.filter((i) => i !== item) : [...prevItems, item]
    );
    setInputValue("");
    handleInputFocus();
  };

  const handleDeleteItemFromList = (name: string) => {
    const draft = selectedItems.filter((item) => item.name !== name);
    setSelectedItems(draft);
  };

  const handleDeleteAllItems = () => {
    if (!selectedItems.length) {
      return;
    }
    setSelectedItems([]);
    setIsOpen(false);
    setCleanerButton(false);
  };

  const deleteItems = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (inputValue) {
      return;
    }

    if (!selectedItems.length) {
      return;
    }

    if (e.key === "Backspace") {
      setSelectedItems((selected) => selected.slice(0, -1));
    }
  };

  const handleMouseEnter = () => {
    if (!selectedItems.length) {
      return;
    }
    setCleanerButton(true);
  };

  const handleMouseLeave = () => {
    if (inputValue) {
      return;
    }
    setCleanerButton(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClickOutside = () => {
    setInputValue("");
    setIsOpen(false);
    setListItems(ITEMS);
    setFocus(false);
    setCleanerButton(false);
  };

  const renderIcon = () => {
    if (inputValue) {
      return <CleanIcon className="input-icon clean-btn" />;
    } else if (cleanerButton) {
      return <CleanIcon className="input-icon clean-btn" />;
    } else if (isOpen) {
      return <SearchIcon className="input-icon" />;
    } else {
      return <ChevronDownIcon className="input-icon" />;
    }
  };

  useOnClickOutside(selectMultipleContainerRef, handleClickOutside);

  useEffect(() => {
    if (!selectedItems.length && !inputValue) {
      setCleanerButton(false);
    }
  }, [selectedItems, inputValue]);

  return (
    <div id="select-multiple" className="max-w-max">
      <div
        id="select-multiple-container"
        className="w-[400px] bg-white p-1 pr-10 flex flex-wrap items-center rounded-lg gap-1 cursor-text relative min-h-[37px] duration-200 hover:!border-violet-300"
        tabIndex={0}
        ref={selectMultipleContainerRef}
        onClick={(e) => {
          e.stopPropagation();
          handleDropDownState();
        }}
        onFocus={handleInputFocus}
        onKeyDown={deleteItems}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          border: `
           1px solid ${focus ? " #c4b5fd" : " rgba(28, 25, 23, 0.1)"}`,
          outline: `${focus ? "1.5px solid rgba(196, 181, 253, 0.5)" : ""}`,
        }}
      >
        <button
          id="select-multiple-btn"
          onClick={handleDeleteAllItems}
          className="inline-flex cursor-pointer absolute right-[10px]"
          style={{
            pointerEvents: `${cleanerButton ? "auto" : "none"}`,
          }}
        >
          {renderIcon()}
        </button>
        {selectedItems?.map((item) => (
          <TagItem
            handleDeleteItemFromList={handleDeleteItemFromList}
            key={item.id}
            name={item.name}
          />
        ))}

        <div id="autosize-input-container" className="overflow-hidden">
          <AutosizeInput
            inputClassName="bg-white outline-none border-none min-h-[25px]"
            id="autosize-input"
            inputRef={(node) => (inputRef.current = node)}
            onChange={inputChangeHandler}
            value={inputValue}
            minWidth={"4px"}
            name=""
            placeholder={selectedItems.length ? "" : "Please select"}
          />
        </div>
      </div>
      {isOpen || inputValue ? (
        <div
          id="list-box-container"
          onMouseDown={(e) => e.stopPropagation()}
          className=" bg-white w-[400px] max-h-[208px] overflow-y-auto rounded-[4px] p-1 absolute mt-1 z-10"
          style={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          {listItems.length < 1 ? (
            <NoData />
          ) : (
            <ListBox
              listItems={listItems}
              listItemRef={listItemRef}
              selectedItems={selectedItems}
              handleItemList={handleItemList}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default MultiSelectInput;
