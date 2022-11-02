import { Routes, Route, Navigate } from "react-router-dom";
import React, { lazy, LazyExoticComponent, Suspense } from "react";
import Spinner from "../components/Loading/Spinner/Spinner";

const SuspenseComponent =
  (Component: LazyExoticComponent<any>) => (props: any) => {
    return (
      <Suspense fallback={"loading..."}>
        <Component {...props} />
      </Suspense>
    );
  };

const Home = SuspenseComponent(lazy(() => import("../application/Home/Home")));
const Recommend = SuspenseComponent(
  lazy(() => import("../application/Recommend/Recommend"))
);
const Singer = SuspenseComponent(
  lazy(() => import("../application/Singer/Singer"))
);
const Rank = SuspenseComponent(lazy(() => import("../application/Rank/Rank")));
const Album = SuspenseComponent(
  lazy(() => import("../application/Album/Album"))
);
const SingerInfo = SuspenseComponent(lazy(()=>import('../application/SingerInfo/SingerInfo')))

export const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Navigate to="/recommend" />} />
        <Route path="/rank" element={<Rank />}>
          <Route path="/rank/:id" element={<Album />} />
        </Route>
        <Route path="/recommend" element={<Recommend />}>
          <Route path="/recommend/:id" element={<Album />} />
        </Route>

        <Route path="/singer" element={<Singer />}>
          <Route path="/singer/:id" element={<SingerInfo/>}/>
        </Route>
      </Route>
      <Route path="/test" element={<Spinner />} />
    </Routes>
  );
};
