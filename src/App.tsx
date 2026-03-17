import { Suspense, lazy } from "react";
import Loader from "./utils/Loader";

const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Dashboard />
    </Suspense>
  );
}

export default App;
