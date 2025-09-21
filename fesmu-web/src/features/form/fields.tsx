import { cn } from "@/shared/lib/utils";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";
import { Textarea } from "@/shared/ui/textarea";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2, Loader2Icon } from "lucide-react";
import { useState } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

export interface BaseFieldsType<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  isDisable?: boolean;
  className?: string;
  isLoad?: boolean;
}

export interface TextFieldsType<T extends FieldValues>
  extends BaseFieldsType<T> {
  checkWorld?: boolean;
  checkAddressDuplicate?: boolean;
  allowedPattern?: RegExp;
  mask?: (value: string) => string;
  maxLength?: number;
}

const textFieldVariants = cva("text-black", {
  variants: {
    variant: {
      default: "text-gray-500",
      tariff: "",
      ad: "focus:border-blue-500 space-y-0 rounded-lg border-2 border-gray-200 px-2 py-1",
    },
    inputVariant: {
      default: "text-black",
      tariff: "bg-gray-100 focus:ring-2 focus:ring-primary",
      ad: "m-0 p-0 text-black border-none shadow-none",
      big: "p-5 bg-white ",
    },
  },
  defaultVariants: {
    variant: "default",
    inputVariant: "default",
  },
});

interface TextFieldProps<T extends FieldValues>
  extends TextFieldsType<T>,
    VariantProps<typeof textFieldVariants> {}

const CommonTextField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  isDisable = false,
  className,
  variant,
  inputVariant,
  checkWorld = true,
  checkAddressDuplicate = false,
  mask,
  allowedPattern,
  maxLength,
}: TextFieldProps<T>) => {
  const { isLoad } = useCommonTextField<T>();

  const onBlur = (value: string) => {};

  const handleChange = (value: string) => {
    let processedValue = value;

    if (mask) {
      processedValue = mask(processedValue);
    }

    if (allowedPattern) {
      if (!allowedPattern.test(processedValue)) {
        return;
      }
    }

    if (maxLength) {
      processedValue = processedValue.slice(0, maxLength);
    }

    form.setValue(name, processedValue as any);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("relative", textFieldVariants({ variant }), className)}
        >
          {label && (
            <FormLabel className={cn("text-gray-500")}>{label}</FormLabel>
          )}
          <FormControl>
            <div>
              <Input
                disabled={isDisable}
                className={cn(textFieldVariants({ inputVariant }))}
                placeholder={placeholder}
                {...field}
                onBlur={(e) => onBlur(e.target.value)}
                onChange={(e) => handleChange(e.target.value)}
              />

              {isLoad && (
                <Loader2Icon className="absolute right-2 top-2 animate-spin text-gray-300" />
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const useCommonTextField = <T extends FieldValues>() => {
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const setCustomError = (
    form: UseFormReturn<T>,
    name: FieldPath<T>,
    message: string
  ) => {
    form.setError(name, {
      type: "manual",
      message: message,
    });
  };

  const clearError = (form: UseFormReturn<T>, name: FieldPath<T>) => {
    form.clearErrors(name);
  };

  return {
    isLoad,
  };
};

const CommonTextAreaField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  isDisable = false,
  className,
  variant,
  inputVariant,
  checkWorld = true,
  checkAddressDuplicate = false,
}: TextFieldProps<T>) => {
  const { isLoad } = useCommonTextField<T>();

  const onBlur = (value: string) => {};

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("relative", textFieldVariants({ variant }), className)}
        >
          {label && (
            <FormLabel className={cn("text-gray-500")}>{label}</FormLabel>
          )}
          <FormControl>
            <div>
              <Textarea
                disabled={isDisable}
                className={cn(textFieldVariants({ inputVariant }))}
                placeholder={placeholder}
                {...field}
                onBlur={(e) => onBlur(e.target.value)}
              />

              {isLoad && (
                <Loader2 className="absolute right-2 top-2 animate-spin text-gray-300" />
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { CommonTextAreaField, CommonTextField, type TextFieldProps };

const checkboxFieldVariants = cva("", {
  variants: {
    variant: {
      default: "flex items-center space-x-2",
      tariff: "flex items-center space-x-2",
      ad: "flex items-center space-x-2",
    },
    inputVariant: {
      default: "",
      tariff: "",
      ad: "",
    },
  },
  defaultVariants: {
    variant: "default",
    inputVariant: "default",
  },
});

interface CheckboxFields<T extends FieldValues>
  extends Omit<BaseFieldsType<T>, "placeholder">,
    VariantProps<typeof checkboxFieldVariants> {}
const CommonCheckboxFields = <T extends FieldValues>({
  form,
  name,
  label,
  isDisable = false,
  className,
  variant,
  inputVariant,
}: CheckboxFields<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "relative flex flex-row items-start space-x-3 space-y-0",
            checkboxFieldVariants({ variant }),
            className
          )}
        >
          <FormControl>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={name}
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isDisable}
                className={cn(checkboxFieldVariants({ inputVariant }))}
              />
              {label && (
                <FormLabel
                  htmlFor={name}
                  className={cn(
                    "text-gray-500 cursor-pointer",
                    isDisable && "cursor-not-allowed opacity-50"
                  )}
                >
                  {label}
                </FormLabel>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface CheckboxListFields<T extends FieldValues>
  extends Omit<BaseFieldsType<T>, "placeholder">,
    VariantProps<typeof checkboxFieldVariants> {
  //   options: DictionariesType[];
}

// const CommonListCheckboxFields = <T extends FieldValues>({
//   form,
//   name,
//   label,
// //   options,
//   isDisable = false,
//   className,
//   variant,
//   inputVariant,
// }: CheckboxListFields<T>) => {
//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className={cn("relative space-y-3", className)}>
//           {label && <FormLabel>{label}</FormLabel>}

//           <FormControl>
//             <div className="flex flex-wrap gap-5">
//               {options.map((option) => (
//                 <Controller
//                   key={option.id}
//                   control={form.control}
//                   name={name}
//                   render={({ field: controllerField }) => {
//                     const values = controllerField.value || [];
//                     const isChecked = values.includes(option.id);

//                     return (
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="checkbox"
//                           checked={isChecked}
//                           disabled={isDisable}
//                           onChange={(e) => {
//                             const newValues = e.target.checked
//                               ? [...values, option.id]
//                               : values.filter((id: number) => id !== option.id);
//                             controllerField.onChange(newValues);
//                           }}
//                           className={cn(
//                             "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500",
//                             "text-green-600 focus:ring-green-500"
//                           )}
//                         />
//                         <label className="text-sm font-medium text-gray-700">
//                           {option.title}
//                         </label>
//                       </div>
//                     );
//                   }}
//                 />
//               ))}
//             </div>
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

export interface CommonSelectType {
  key: string | number;
  value: string;
}

export { CommonCheckboxFields };

interface CommonSelectFieldsProps<T extends FieldValues>
  extends BaseFieldsType<T> {
  options: CommonSelectType[];
}

const CommonSelectFields = <T extends FieldValues>({
  form,
  name,
  placeholder,
  options,
  label,
  isLoad,
}: CommonSelectFieldsProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative space-y-3">
          {label && (
            <FormLabel className="text-gray-500 block mb-2">{label}</FormLabel>
          )}

          {!isLoad ? (
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>

                <SelectContent>
                  {options.map((item) => (
                    <SelectItem key={item.key} value={String(item.key)}>
                      {item.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          ) : (
            <Skeleton className="w-full h-10" />
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { CommonSelectFields };
