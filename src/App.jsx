import { useAuth } from "../context/AuthContext";
import CoffeeForm from "./Components/CoffeeForm";
import Hero from "./Components/Hero";
import History from "./Components/History";
import Layout from "./Components/Layout";
import Stats from "./Components/Stats";

function App() {
  const { globalUser, globalData, isLoading } = useAuth();
  const isAuth = globalUser;
  const isData = globalData && !!Object.keys(globalData || {}).length;

  const authContent = (
    <>
      <Stats />
      <History />
    </>
  );

  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuth={isAuth} />
      {isLoading && isAuth && <p>Loading data...</p>}
      {isAuth && isData && authContent}
    </Layout>
  );
}
export default App;
