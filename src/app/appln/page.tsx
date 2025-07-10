import Colors from "./colors";
import Qualities from "./qualities";
import ApplnImg from "./appln-imgs";
import { selectData } from "./data";
import { quals } from "./data-files/quals";
import { applns } from "./data-files/applnImgs";
import { colors } from "./data-files/colors";
import { FilterSelect } from "./filter-select";
import QualitySearch from "./quality-search";

// 1-60 5-300 10-600 1h-3600  24h-86400
export const revalidate = 86400;

// Delay utility to simulate API loading time
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Application Images
 * @returns
 */
export default async function ApplicationImagesPage() {
  // Simulate 3 second delay as if fetching from an API
  await wait(3000);

  // const colors = await getApplnColors();
  // const quals = await getApplnQuals();
  // const applns = await getApplnImgs();
  //

  const filterColor = <Colors colors={colors} />;

  const filterSelect = <FilterSelect filterOptions={selectData} />;

  const qualitySearch = <QualitySearch qualities={quals} />;

  const qualitiesSection = <Qualities qualities={quals} />;

  const applnImgsSection = <ApplnImg applnImgs={applns} />;

  return (
    <div className="h-[calc(100vh-3rem)] bg-background overflow-y-auto">
      <div className="flex flex-col h-full">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-12 h-full overflow-hidden">
          {/* Left Section (Sidebar) */}
          <div className="col-span-2 flex flex-col gap-2">
            {/* Quality Search and Filter Select */}
            <div className="space-y-1 p-2">
              {qualitySearch}
              {filterSelect}
            </div>

            {/* Qualities Section */}
            <div className="flex-1 overflow-y-auto">{qualitiesSection}</div>
          </div>

          {/* Right Section (Main Content) */}
          <div className="col-span-10 flex flex-col">
            {/* Filter Colors */}
            <div className=" p-1">{filterColor}</div>

            {/* Application Images Section */}
            <div className="flex-1 overflow-y-auto p-2">{applnImgsSection}</div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex flex-col gap-2 p-1">
            {/* Filter Controls */}
            <div className="bg-card rounded-lg border shadow-sm space-y-2">
              {qualitySearch}
              {filterSelect}
              {filterColor}
            </div>

            {/* Main Content */}
            <div className="bg-card rounded-lg border shadow-sm space-y-2">
              {/* Qualities Section */}
              <section className="border-b border-border/60 ">
                {qualitiesSection}
              </section>

              {/* Images Section */}
              <section className="">{applnImgsSection}</section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
