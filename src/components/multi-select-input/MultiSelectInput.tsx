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
        className="input-container w-[400px] bg-white p-1 pr-10 flex flex-wrap items-center rounded-lg gap-1 cursor-text relative min-h-[37px] duration-200 hover:!border-violet-300"
        tabIndex={0}
        ref={tagContainerRef}
        onClick={handleDropDownState}
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
          id="input-btn"
          onClick={handleDeleteAllItems}
          className=" inline-flex cursor-pointer absolute right-[10px]"
          style={{
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

        <div className="overflow-hidden">
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
          ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}
          className=" bg-white w-[400px] max-h-[208px] overflow-y-auto rounded-[4px] p-1 absolute mt-1"
          style={{
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          {listItems.length < 1 ? <NoData /> : <ListBox />}
        </div>
      ) : null}
    </>
  );
};

export default MultiSelectInput;
