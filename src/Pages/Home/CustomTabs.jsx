import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import TravelGuide from "./TravelGuide";
import PlanSection from "./PlanSection";

const CustomTabs = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-sky-200">
      <Tabs>
        <TabList>
          <Tab>Package Plans</Tab>
          <Tab>Tour Guides</Tab>
        </TabList>

        <TabPanel>
          <PlanSection />
        </TabPanel>
        <TabPanel>
          <TravelGuide />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CustomTabs;
