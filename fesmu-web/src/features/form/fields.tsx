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
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

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

export interface CommonDatePickerProps<T extends FieldValues>
  extends BaseFieldsType<T> {
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  showYearDropdown?: boolean;
  showMonthDropdown?: boolean;
  fromYear?: number;
  toYear?: number;
}

const CommonDatePicker = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder = "Select date",
  isDisable = false,
  className,
  isLoad,
  minDate,
  maxDate,
  dateFormat = "PPP",
}: CommonDatePickerProps<T>) => {
  const [open, setOpen] = React.useState(false);

  const date = form.watch(name);

  const handleSelect = (selectedDate: Date | undefined) => {
    form.setValue(name, selectedDate as any, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setOpen(false);
  };

  const error = form.formState.errors[name];
  const isInvalid = !!error;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && <FormLabel className={cn("text-gray-500")}>{label}</FormLabel>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={name}
            disabled={isDisable || isLoad}
            className={cn(
              "w-full justify-between font-normal",
              isInvalid && "border-red-500 focus:ring-red-500",
              isDisable && "opacity-50 cursor-not-allowed"
            )}
            type="button"
          >
            <span className={cn(!date && "text-muted-foreground")}>
              {date
                ? format(new Date(date), dateFormat, { locale: ru })
                : placeholder}
            </span>
            <ChevronDownIcon
              className={cn(
                "h-4 w-4 transition-transform",
                open && "rotate-180"
              )}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0"
          align="start"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <Calendar
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={handleSelect}
            disabled={(date) =>
              (minDate && date < minDate) ||
              (maxDate && date > maxDate) ||
              false
            }
            classNames={{
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
            }}
          />
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-sm text-red-500 px-1">{error.message as string}</p>
      )}
    </div>
  );
};

export { CommonDatePicker };
