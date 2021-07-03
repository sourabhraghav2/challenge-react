import { connect } from "react-redux";
import "components/style/app.scss";
import Home from "Home";

const App = () => {
  return (
    <div className="app">
      <Home />
    </div>
  );
};
export default connect((state) => {}, {})(App);
