import {
  useRef,
  useState,
  useEffect,
  ChangeEvent,
  ReactNode,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { ITEMS } from "../constant";
import { TagProps } from "../types";
import { FnContext } from "./FnContext";

type Props = {
  children: ReactNode;
};

export const FnProvider = ({ children }: Props) => {
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

  const handleDropDownState = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
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
    if (selectedItems.includes(item)) {
      handleDeleteItemFromList(item.name);
    } else {
      setSelectedItems((prevItems) => [...prevItems, item]);
    }

    setListItems(ITEMS);
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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (e: any) => {
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

  return (
    <FnContext.Provider
      value={{
        inputChangeHandler,
        handleDropDownState,
        handleItemList,
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
        listItemRef,
        focus,
        inputValue,
        inputRef,
        dropdownRef,
        isOpen,
      }}
    >
      {children}
    </FnContext.Provider>
  );
};
