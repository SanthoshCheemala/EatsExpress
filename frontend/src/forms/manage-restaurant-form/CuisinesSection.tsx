import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckBox from "./CuisineCheckBox";

const CuisinesSection = () => {
  const { control } = useFormContext();
  return (
    <div className="spcae-y-2">
      <div className="">
        <h2 className="text-2xl font-bold ">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid grid-1 md:grid-cols-5">
              {cuisineList.map((cuisineItem, index) => (
                <CuisineCheckBox
                  key={index}
                  cuisine={cuisineItem}
                  field={field}
                />
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CuisinesSection;
