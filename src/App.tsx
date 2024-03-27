import "./App.css";
import MultiSelectInput from "./components/multi-select-input/MultiSelectInput";
import { FnProvider } from "./context/FnProvider";

const App = () => {
  return (
    <>
      <FnProvider>
        <MultiSelectInput />
      </FnProvider>
    </>
  );
};

export default App;
