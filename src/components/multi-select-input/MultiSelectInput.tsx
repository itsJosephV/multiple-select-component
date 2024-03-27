import AutosizeInput from "react-input-autosize";

import { CleanIcon } from "../../icons/CleanIcon";
import { SearchIcon } from "../../icons/SearchIcon";
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";
import { useFnContext } from "../../context/useFnContext";
import { NoData } from "./NoData";
import { TagItem } from "./TagItem";
import ListBox from "./ListBox";

const MultiSelectInput = () => {
  const {
    inputChangeHandler,
    handleDropDownState,
    handleDeleteAllItems,
    deleteItems,
    handleMouseEnter,
    handleMouseLeave,
    handleInputFocus,
    handleDeleteItemFromList,
    selectedItems,
    tagContainerRef,
    cleanerButton,
    listItems,
    focus,
    inputValue,
    inputRef,
    dropdownRef,
    isOpen,
  } = useFnContext();

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

  return (
    <>
      <div
        id="input-container"
        className="input-container"
        tabIndex={0}
        ref={tagContainerRef}
        onClick={handleDropDownState}
        onFocus={handleInputFocus}
        onKeyDown={deleteItems}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
          id="input-btn"
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
            handleDeleteItemFromList={handleDeleteItemFromList}
          />
        ))}

        <div
          style={{
            overflow: "hidden",
          }}
        >
          <AutosizeInput
            id="autosize-input"
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
          ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}
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
          {listItems.length < 1 ? <NoData /> : <ListBox />}
        </div>
      ) : null}
    </>
  );
};

export default MultiSelectInput;
