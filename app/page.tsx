import React from "react";
import LandingSectionScreen from "./screens/LandingSectionScreen";
import FeaturesSectionScreen from "./screens/FeaturesSectionScreen";
import FooterSectionScreen from "./screens/FooterSectionScreen";
import Navbar from "./components/shared/Navbar";

export default function Home(): React.JSX.Element {
  return (
    <React.Fragment>
      <Navbar />
      <main className="w-screen">
        <LandingSectionScreen />
        <FeaturesSectionScreen />
        <FooterSectionScreen />
      </main>
    </React.Fragment>
  );
}
