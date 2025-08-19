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
    <div className="md:h-[calc(100vh-3rem)] h-full bg-background">
      <div className="flex flex-col h-full">
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-12 h-full">
          {/* Left Section (Sidebar) */}
          <div className="col-span-2 flex flex-col border-r border-border">
            {/* Quality Search and Filter Select */}
            <div className="p-2 space-y-2 border-b border-border">
              {qualitySearch}
              {filterSelect}
            </div>

            {/* Qualities Section */}
            <div className="flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto">{qualitiesSection}</div>
            </div>
          </div>

          {/* Right Section (Main Content) */}
          <div className="col-span-10 flex flex-col">
            {/* Filter Colors */}
            <div className="px-0 md:py-0.5 py-2 border-b border-border">
              {filterColor}
            </div>

            {/* Application Images Section */}
            <div className="flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-2">
                {applnImgsSection}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col h-full">
          <div className="flex flex-col h-full">
            {/* Filter Controls */}
            <div className="border-b border-border">
              <div className="p-2 space-y-2">
                <div className="grid grid-cols-1 gap-2">
                  {qualitySearch}
                  {filterSelect}
                </div>
                <div className="pt-2 border-t border-border">{filterColor}</div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
              {/* Images Section */}
              <div className="border-b border-border">
                <div className="p-2">{applnImgsSection}</div>
              </div>

              {/* Qualities Section */}
              <div className="flex-1 overflow-hidden">
                <div className="flex-1 px-2 overflow-y-auto">
                  {qualitiesSection}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
