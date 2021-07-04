import { connect } from "react-redux";
import "components/style/app.scss";
import Home from "Home";
import { ToastProvider } from "react-toast-notifications";

const App = () => {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={2000}>
      <Home />
    </ToastProvider>
  );
};
export default connect((state) => {}, {})(App);
