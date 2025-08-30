import { allQuartorData, Q2YlgData } from "./components/quartors/data";
import QuartorCard from "./components/quartors/quartor-card";
import QuarterTable from "./components/quartors/quartor-table";
import { topColors } from "./components/top-colors/data";
import TopColors from "./components/top-colors/top-colors";
import { topCustomers } from "./components/top-customers/data";
import TopCustomers from "./components/top-customers/top-customers";
import { topQualities } from "./components/top-qualities/data";
import TopQualities from "./components/top-qualities/top-qualities";
import { zoneData } from "./components/zone-table/data";
import ZoneSaleCard from "./components/zone-table/zone-sale-card";

const CRMRoute = () => {
  return (
    <div>
      {/* Desktop UI: Visible on lg (≥1024px) */}
      <div className="hidden lg:grid lg:grid-cols-10 gap-2 p-2">
        <div className="col-span-2 flex flex-col gap-2">
          <QuartorCard quartorData={Q2YlgData} />
          <QuarterTable quartorToYear={allQuartorData} />
        </div>
        <div className="col-span-3 flex flex-col gap-2">
          <ZoneSaleCard zoneData={zoneData} />
          <TopColors colors={topColors} />
        </div>
        <div className="col-span-5 flex gap-2">
          <div className="w-full">
            <TopCustomers customers={topCustomers} />
          </div>
          <div className="w-full">
            <TopQualities qualities={topQualities} />
          </div>
        </div>
      </div>

      {/* Tablet UI: Visible on md (≥768px and <1024px) */}
      <div className="hidden md:block lg:hidden">
        <div className="flex gap-2 p-2">
          {/* Quartor Block - 1/4 width */}
          <div className="w-1/4 flex flex-col gap-2">
            <QuartorCard quartorData={Q2YlgData} />
            <QuarterTable quartorToYear={allQuartorData} />
          </div>
          {/* Zone + Color Block - 3/4 width */}
          <div className="w-3/4 flex flex-col gap-2">
            <ZoneSaleCard zoneData={zoneData} />
            <TopColors colors={topColors} />
          </div>
        </div>
        {/* Customers + Qualities */}
        <div className="flex flex-col md:flex-row gap-2 p-2">
          <div className="w-full">
            <TopCustomers customers={topCustomers} />
          </div>
          <div className="w-full">
            <TopQualities qualities={topQualities} />
          </div>
        </div>
      </div>

      {/* Mobile UI: Visible on sm (<768px) */}
      <div className="md:hidden grid gap-2 p-2">
        <QuartorCard quartorData={Q2YlgData} />
        <QuarterTable quartorToYear={allQuartorData} />
        <ZoneSaleCard zoneData={zoneData} />
        <TopColors colors={topColors} />
        <TopCustomers customers={topCustomers} />
        <TopQualities qualities={topQualities} />
      </div>
    </div>
  );
};

export default CRMRoute;
