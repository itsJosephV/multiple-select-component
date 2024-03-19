import "./App.css";
import { useEffect, useRef, useState } from "react";
import AutosizeInput from "react-input-autosize";
//Icons
import { CleanIcon } from "./icons/CleanIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { ChevronDownIcon } from "./icons/ChevronDownIcon";
import { AddedIcon } from "./icons/AddedIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { NoDataIcon } from "./icons/NoDataIcon";
//Props
import { TagProps } from "./types";
//Data
import { ITEMS } from "./data";

export default function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const tagContainerRef = useRef<HTMLDivElement | null>(null);
  const listItemRef = useRef<HTMLLIElement | null>(null);

  const [listItems, setListItems] = useState<TagProps[]>(ITEMS);
  const [selectedItems, setSelectedItems] = useState<TagProps[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const [cleanerButton, setCleanerButton] = useState<boolean>(false);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    if (value) {
      setIsOpen(true);
      setCleanerButton(true);
      const filteredItems = ITEMS.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setListItems(filteredItems);
    } else if (!value && !selectedItems) {
      setCleanerButton(false);
    } else {
      setListItems(ITEMS);
    }
  };

  const handleDropDownState = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (inputValue) {
      setInputValue("");
    }
    setIsOpen(!isOpen);
    setListItems(ITEMS);
  };

  const handleInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setFocus(true);
    }
  };

  const handleItemList = (item: TagProps): void => {
    if (selectedItems.includes(item)) {
      handleDeleteItemFromList(item.name);
    } else {
      setSelectedItems((prevItems) => [...prevItems, item]);
    }

    setListItems(ITEMS);
    setInputValue("");
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

  const deleteItems = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  function renderIcon() {
    if (inputValue) {
      return <CleanIcon className="input-icon clean-btn" />;
    } else if (cleanerButton) {
      return <CleanIcon className="input-icon clean-btn" />;
    } else if (isOpen) {
      return <SearchIcon className="input-icon" />;
    } else {
      return <ChevronDownIcon className="input-icon" />;
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target !== dropdownRef.current &&
        e.target !== tagContainerRef.current
      ) {
        setInputValue("");
        setIsOpen(false);
        setListItems(ITEMS);
        setFocus(false);
        setCleanerButton(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!selectedItems.length && !inputValue) {
      setCleanerButton(false);
    }
  }, [selectedItems, inputValue]);

  useEffect(() => {
    console.log(selectedItems);
  }, [selectedItems]);

  return (
    <>
      <div
        className="tag-container"
        ref={tagContainerRef}
        onClick={handleDropDownState}
        onFocus={handleInputFocus}
        onKeyDown={deleteItems}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        style={{
          width: "400px",
          backgroundColor: "white",
          border: `
          1px solid ${focus ? " #c4b5fd" : " rgba(28, 25, 23, 0.1)"}`,
          padding: "5px",
          paddingRight: "40px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          borderRadius: "8px",
          gap: "5px",
          cursor: "text",
          position: "relative",
          minHeight: "37px",
          outline: `${focus ? "1.5px solid rgba(196, 181, 253, 0.5)" : ""}`,
          transition: "200ms",
        }}
      >
        <button
          className="input-btn"
          onClick={handleDeleteAllItems}
          style={{
            all: "unset",
            display: "inline-flex",
            cursor: "pointer",
            position: "absolute",
            right: "10px",
            pointerEvents: `${cleanerButton ? "auto" : "none"}`,
          }}
        >
          {renderIcon()}
        </button>
        {selectedItems?.map((item) => (
          <TagItem
            key={item.id}
            name={item.name}
            handleDropDownState={handleDropDownState}
            handleDeleteItemFromList={handleDeleteItemFromList}
          />
        ))}

        <div
          style={{
            overflow: "hidden",
          }}
        >
          <AutosizeInput
            onClick={handleDropDownState}
            inputRef={(node) => (inputRef.current = node)}
            onChange={inputChangeHandler}
            value={inputValue}
            minWidth={"4px"}
            inputStyle={{
              outline: "none",
              border: "none",
              minHeight: "25px",
            }}
            name=""
            placeholder={selectedItems.length ? "" : "Please select"}
          />
        </div>
      </div>

      {isOpen || inputValue ? (
        <div
          tabIndex={0}
          className="dropdown-container"
          ref={dropdownRef}
          onClick={(e) => {
            e.stopPropagation();
            handleInputFocus();
          }}
          style={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            backgroundColor: "white",
            width: "400px",
            maxHeight: "201px",
            overflowY: "auto",
            borderRadius: "4px",
            padding: "3px",
            position: "absolute",
            marginTop: "5px",
          }}
        >
          {listItems.length < 1 ? (
            <NoData />
          ) : (
            <ul
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
                    tabIndex={0}
                    aria-selected={selectedItems.includes(item)}
                    title={item.name}
                    ref={listItemRef}
                    key={item.id}
                  >
                    <div
                      className="list-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemList(item);
                        handleInputFocus();
                      }}
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
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </>
  );
}

const TagItem = ({
  name,
  handleDropDownState,
  handleDeleteItemFromList,
}: {
  name: string;
  handleDropDownState: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleDeleteItemFromList: (name: string) => void;
}) => {
  return (
    <div
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
        onClick={handleDropDownState}
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
        style={{ all: "unset", cursor: "pointer", display: "inline-flex" }}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteItemFromList(name);
        }}
      >
        <DeleteIcon style={{ color: "#a8a29e" }} className="delete-icon" />
      </button>
    </div>
  );
};

const NoData = () => {
  return (
    <div
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
