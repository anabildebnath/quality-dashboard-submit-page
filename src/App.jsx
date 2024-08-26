import "./App.css";
import { Component } from "./components/ui/Component";
import { DatePickerForm } from "./components/ui/DatePickerForm";

function App() {
  return (
    <div>
      <DatePickerForm />
      <div className="mt-12">
          <Component/>
      </div>
    
    </div>
  );
}

export default App;
