import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LGDataCard from "./components/q2lgdata";
import { Q2lgData, Q2YlgData } from "./lg-data";
import ZoneSaleComponent from "./components/zone-sale-card";
import ColorCard from "../appln/color-card";
import ColorTop10 from "./components/color-top-10";
import CustomerTop15 from "./components/customer-top-15";
import QualityTop15 from "./components/quality-top-15";

const CRMRoute = () => {
  return (
    <div className="p-2 space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-2">
        <div className="lg:col-span-2">
          <LGDataCard lgData={Q2lgData} />
        </div>
        <div className="lg:col-span-2">
          <LGDataCard lgData={Q2YlgData} />
        </div>

        <div className="lg:col-span-3">
          <ZoneSaleComponent />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
        <div className="lg:col-span-2">
          <ColorTop10 />
        </div>
        <div className="lg:col-span-2">
          <CustomerTop15 />
        </div>
        <div className="lg:col-span-2">
          <QualityTop15 />
        </div>
      </div>
    </div>
  );
};

export default CRMRoute;
