import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/Layout";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>

        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
