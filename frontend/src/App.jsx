import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routing/AppRouter";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;