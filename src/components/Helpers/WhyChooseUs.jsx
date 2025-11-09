import { GrSecure } from "react-icons/gr";
import { LiaMedalSolid } from "react-icons/lia";
import { MdOutlineLocalOffer } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

const qualityMenus = [
  {
    id: 1,
    title: "Free delivery",
    iconName: TbTruckDelivery,
    description: "Free Delivery for all customer who buying from us",
  },
  {
    id: 2,
    title: "Quality guarantee",
    iconName: LiaMedalSolid,
    description: "Free Delivery for all customer who buying from us",
  },
  {
    id: 3,
    title: "Special offers",
    iconName: MdOutlineLocalOffer,
    description: "Free Delivery for all customer who buying from us",
  },
  {
    id: 4,
    title: "Secure payment",
    iconName: GrSecure,
    description: "Free Delivery for all customer who buying from us",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full justify-center items-center gap-8 max-sm:w-[350px] mt-2">
      {/* Free Deliivery */}
      {qualityMenus.map((item) => {
        // Store Icons
        const Icons = item.iconName;

        return (
          <div
            className="flex flex-col justify-center shadow-md rounded-lg lg:px-4 lg:py-4 px-2 py-2 border border-gray-300"
            key={item.id}
          >
            <div className="flex gap-x-2">
              <div className="mt-2">
                <Icons size={28} className="text-indigo-600" />
              </div>
              <div className="block">
                <h3 className="lg:text-2xl md:text-xl text-base font-medium text-nowrap">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base mb-4 mt-1.5 max-w-[250px]">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WhyChooseUs;
