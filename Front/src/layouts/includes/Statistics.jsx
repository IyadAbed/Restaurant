/* eslint-disable react/prop-types */

// icons

import { ImBooks } from "react-icons/im";
import { BsPerson } from "react-icons/bs";
import { RiChatQuoteLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "../../plugins/axios";

export const Statistics = () => {
  const [orders, setorders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const datas = await axios.get("getAllOrder");
        if (datas?.data?.success) {
          console.log(datas.data.success);
          setorders(datas.data.success);
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
      <div className="stats stats-vertical xl:stats-horizontal md:stats-horizontal bg-white shadow-lg ">
        <div className="stat">
          <div className="stat-title  text-[#529b03] font-bold">
            Total Orders
          </div>
          <div className="stat-value text-[#529b03]">{orders?.length}</div>
          <div className="stat-figure text-[#529b03]">
            <ImBooks className="text-[40px]" />
          </div>
        </div>

        {/* <div className="stat">
          <div className="stat-figure text-[#529b03]">
            <BsPerson className="text-[40px]" />
          </div>
          <div className="stat-title text-[#529b03] font-bold">
            Total Report's
          </div>
          <div className="stat-value text-[#529b03]">2</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-[#529b03]">
            <RiChatQuoteLine className="text-[40px] text-[#529b03]" />
          </div>
          <div className="stat-title  text-[#529b03] font-bold">
            Total User's{" "}
          </div>
          <div className="stat-value text-[#529b03]">1</div>
        </div> */}
      </div>
    </div>
  );
};
