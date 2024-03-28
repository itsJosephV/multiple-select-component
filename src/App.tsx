import "./App.css";
import MultiSelectInput from "./components/multi-select-input/MultiSelectInput";

const App = () => {
  return (
    <div className="p-20">
      <article className="border p-2 flex flex-col">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam earum
          laborum ducimus obcaecati praesentium laudantium, dicta nam rem
          delectus ea minus reiciendis temporibus doloribus doloremque beatae
          maxime quidem aperiam ipsa molestiae maiores neque est! Voluptas
          facere veritatis eum molestias, cumque ullam quia saepe non
          consequuntur excepturi. Sequi veniam culpa ea.
        </p>
        <MultiSelectInput />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam earum
          laborum ducimus obcaecati praesentium laudantium, dicta nam rem
          delectus ea minus reiciendis temporibus doloribus doloremque beatae
          maxime quidem aperiam ipsa molestiae maiores neque est! Voluptas
          facere veritatis eum molestias, cumque ullam quia saepe non
          consequuntur excepturi. Sequi veniam culpa ea.
        </p>
        <div>
          <MultiSelectInput />
        </div>
      </article>
    </div>
  );
};

export default App;
