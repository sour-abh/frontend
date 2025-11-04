
import Select, {
  components,
  type SingleValueProps
} from "react-select";
import { Image, Video, Twitter, Text } from 'lucide-react';

type IconValue = 'image' | 'video' | 'twitter' | 'text';

export const Icons = [
  { label: <Image className="size-4" />, value: 'image' as IconValue },
  { label: <Video className="size-4" />, value: 'video' as IconValue },
  { label: <Twitter className="size-4" />, value: 'twitter' as IconValue },
  { label: <Text className="size-4" />, value: 'text' as IconValue },
] as const;


export type IconOption = typeof Icons[number];

interface CustomSelectProps {
  value: IconOption | null;
  onChange: (option: IconOption | null) => void;
  options: readonly IconOption[];
}

// Custom component for how the selected value is displayed
const CustomSingleValue = (props: SingleValueProps<IconOption>) => (
  <components.SingleValue {...props}>
    <div className="flex items-center gap-2 text-gray-700">
      {props.data?.label}
      <span>{props.data?.value}</span>
    </div>
  </components.SingleValue>
);

const CustomSelect = ({ value, onChange, options }: CustomSelectProps) => {
  const handleReactSelectChange = (
    newValue: IconOption | null | readonly IconOption[]
  ) => {
    // Pass only the newValue to the custom handler, ensuring it's the right type
    if (Array.isArray(newValue)) {
      onChange(newValue[0] || null);
    } else {
      onChange(newValue as IconOption | null);
    }
  };

  return (
    <Select
      value={value}
      onChange={handleReactSelectChange}
      options={options}
      // Use Tailwind for overall styling
      className="w-full"
      // Pass your custom SingleValue component
      components={{ SingleValue: CustomSingleValue }}
      // Customize the display of each option in the menu
      formatOptionLabel={(option) => (
        <div className="flex items-center gap-2">
          {option.label}
          <span>{option.value}</span>
        </div>
      )}
      // Use the `classNames` prop to style specific elements with Tailwind classes
      classNames={{
        control: (state) =>
          `!rounded-md !border-1 ${
            state.isFocused
              ? "!border-purple-500 !ring-purple-500/50 !ring-[3px] "
              : "!border-gray-500"
          }`,
        option: (state) =>
          `
          ${
            state.isFocused
              ? "!bg-black !text-white !w-full !rounded-md  !bg-purple-500 !p-2 !transition-colors !duration-300"
              : "!w-full !rounded-md !text-purple-500 !bg-white !p-2 !transition-colors !duration-300 "
          }`,
      }}
    />
  );
};

export default CustomSelect;